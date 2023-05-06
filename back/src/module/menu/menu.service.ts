import { Injectable, Logger } from '@nestjs/common';
import { MenuRepository } from '@modules/menu/repository/menu.repository';
import { MenuRoleMapRepository } from '@modules/menu/repository/menu-role-map.repository';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { MenusInput } from '@modules/menu/dto/input/menus.input';
import { MenusOutput } from '@modules/menu/dto/output/menus.output';
import { FindOptionsOrder, IsNull } from 'typeorm';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UtilSearch } from '@common/util/Util.search';
import { UtilPaging } from '@common/util/Util.paging';
import { UtilSort } from '@common/util/Util.sort';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { InsertMenuRoleMapInput } from '@modules/menu/dto/input/insert-menu-role-map.input';
import { UpdateMenuRoleMapInput } from '@modules/menu/dto/input/update-menu-role-map.input';
import { MenuRoleMapEntity } from '@modules/menu/dto/output/entity/menu-role-map.entity';
import { RearrangementMenuInput } from '@modules/menu/dto/input/rearrangement-menu.input';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { UtilCommon } from '@common/util/Util.common';

@Injectable()
export class MenuService {
  private readonly logger = new Logger(MenuService.name);
  constructor(
    private menuRepository: MenuRepository,
    private menuRoleMapRepository: MenuRoleMapRepository,
  ) {}

  async menus(
    pagingInput: Nullable<PagingInput>,
    menusInput: Nullable<MenusInput>,
    _qb?: SelectQueryBuilder<MenuEntity>,
  ): Promise<MenusOutput> {
    const qb = _qb ?? this.menuRepository.createQueryBuilder('menu');
    const order: FindOptionsOrder<MenuEntity> = {};

    let where: FindOptionsWhere<MenuEntity> = {};

    if (menusInput) {
      const { search, sort } = menusInput;
      if (search) where = UtilSearch.getSearchWhere(search);
      if (search?.role)
        where.menuRoleMaps = UtilSearch.getSearchWhere(search.role);
      if (sort) {
        if (
          Object.keys(sort).some((o) =>
            ['path', 'frontComponentId'].includes(o),
          )
        ) {
          qb.leftJoinAndSelect(`${qb.alias}.route`, `route`);
        }

        UtilSort.getSort(sort).forEach(([k, s], i) => {
          if (['path', 'frontComponentId'].includes(k)) {
            if (i === 0) {
              qb.orderBy(`route.${k}`, s.sort);
            } else {
              qb.addOrderBy(`route.${k}`, s.sort);
            }
          } else {
            if (i === 0) {
              qb.orderBy(`${qb.alias}.${k}`, s.sort);
            } else {
              qb.addOrderBy(`${qb.alias}.${k}`, s.sort);
            }
          }
        });
      }
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb.setFindOptions({
        where,
        order,
      }),
      classRef: MenuEntity,
    });
  }

  async hasMenuRoleMap(seqNo: number) {
    return this.menuRoleMapRepository.exist({
      where: {
        seqNo,
      },
    });
  }

  async hasMenu(seqNo: number) {
    return this.menuRepository.exist({
      where: {
        seqNo,
      },
    });
  }

  async rearrangementMenu(
    p: RearrangementMenuInput,
  ): Promise<MenuRoleMapEntity> {
    const getExistingChildren = async (seqNo?: Nullable<number>) => {
      return await this.menuRoleMapRepository.find({
        where: {
          parentSeqNo: UtilCommon.nilToNull(seqNo, (o) => o, IsNull()),
        },
        order: {
          orderNo: 'ASC',
        },
      });
    };
    const menuRoleMap = await this.menuRoleMapRepository.findOneByOrFail({
      seqNo: p.seqNo,
    });

    if (menuRoleMap) {
      const children = (await getExistingChildren(p.parentSeqNo)).filter(
        (o) => o.seqNo !== p.seqNo,
      );

      console.log(
        p,
        children,
        [
          ...children.map((o, i) => {
            const orderNo = i + 1;
            return MenuRoleMapEntity.create({
              ...o,
              parentSeqNo: p.parentSeqNo,
              orderNo: orderNo >= p.orderNo ? orderNo + 1 : orderNo,
            });
          }),
          MenuRoleMapEntity.create({
            ...menuRoleMap,
            ...p,
          }),
        ]
          .sort((a, b) => a.orderNo - b.orderNo)
          .map((o, i) => {
            return MenuRoleMapEntity.create({
              ...o,
              orderNo: i + 1,
            });
          }),
      );
      if (menuRoleMap.parentSeqNo !== p.parentSeqNo) {
        await this.menuRoleMapRepository.save(
          [
            ...children.map((o, i) => {
              const orderNo = i + 1;
              return MenuRoleMapEntity.create({
                ...o,
                parentSeqNo: p.parentSeqNo,
                orderNo: orderNo >= p.orderNo ? orderNo + 1 : orderNo,
              });
            }),
            MenuRoleMapEntity.create({
              ...menuRoleMap,
              ...p,
            }),
          ]
            .sort((a, b) => a.orderNo - b.orderNo)
            .map((o, i) => {
              return MenuRoleMapEntity.create({
                ...o,
                orderNo: i + 1,
              });
            }),
        );
      } else {
        await this.menuRoleMapRepository.save([
          ...children.map((o, i) => {
            const orderNo = i + 1;
            return MenuRoleMapEntity.create({
              ...o,
              parentSeqNo: p.parentSeqNo,
              orderNo: orderNo >= p.orderNo ? orderNo + 1 : orderNo,
            });
          }),
          MenuRoleMapEntity.create({
            ...menuRoleMap,
            ...p,
          }),
        ]);
      }
    } else {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
    }
    return menuRoleMap;
  }
  async saveMenuRoleMap(
    p: InsertMenuRoleMapInput | UpdateMenuRoleMapInput,
  ): Promise<MenuRoleMapEntity> {
    return this.menuRoleMapRepository.save(
      MenuRoleMapEntity.create({
        seqNo: p instanceof UpdateMenuRoleMapInput ? p.seqNo : undefined,
        menuSeqNo: p.menuSeqNo,
        roleSeqNo: p.roleSeqNo,
        desc: p.desc,
      }),
    );
  }
}
