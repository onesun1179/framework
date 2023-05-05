import { Injectable, Logger } from '@nestjs/common';
import { MenuRepository } from '@modules/menu/repository/menu.repository';
import { MenuRoleMapRepository } from '@modules/menu/repository/menu-role-map.repository';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { MenusInput } from '@modules/menu/dto/input/menus.input';
import { MenusOutput } from '@modules/menu/dto/output/menus.output';
import { FindOptionsOrder } from 'typeorm';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UtilSearch } from '@common/util/Util.search';
import { UtilPaging } from '@common/util/Util.paging';
import { UtilSort } from '@common/util/Util.sort';

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
  ): Promise<MenusOutput> {
    const qb = this.menuRepository.createQueryBuilder('menu');
    const order: FindOptionsOrder<MenuOutput> = {};

    let where: FindOptionsWhere<MenuOutput> = {};

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
          qb.leftJoinAndSelect(`menu.route`, `route`);
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

      // if (sort?.frontComponentId) {
      //   order.route ??= {};
      //   order.route.frontComponentId = {
      //     direction : sort.frontComponentId
      //
      //   }
      //   order.route.frontComponentId = UtilSort.getFindOptionsOrder(
      //     sort.frontComponentId,
      //   );
      // }
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb.setFindOptions({
        where,
        order,
      }),
      classRef: MenuOutput,
    });
  }
}
