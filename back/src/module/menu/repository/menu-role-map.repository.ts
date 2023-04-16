import { CustomRepository } from '@common/decorator/CustomRepository';
import { FindOptionsOrder, Repository } from 'typeorm';
import { MenuRoleMapEntity } from '@modules/menu/entity/menu-role-map.entity';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { MenuEntity } from '@modules/menu/entity/menu.entity';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { MenuRoleMapsInput } from '@modules/menu/dto/input/menu-role-maps.input';
import { MenuRoleMapsOutput } from '@modules/menu/dto/output/menu-role-maps.output';

@CustomRepository(MenuRoleMapEntity)
export class MenuRoleMapRepository extends Repository<MenuRoleMapEntity> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    menuByAuthsInput: Nullable<MenuRoleMapsInput>,
  ): Promise<MenuRoleMapsOutput> {
    const qb = this.createQueryBuilder('menuRoleMap');
    let order: FindOptionsOrder<MenuRoleMapEntity> = {};
    let where: FindOptionsWhere<MenuRoleMapEntity> = {};

    if (menuByAuthsInput) {
      const { search, sort } = menuByAuthsInput;

      if (search) {
        if (search.menu) {
          where.menu = UtilSearch.getFindOptionsWhere(search.menu);
        }
        where = {
          ...where,
          ...UtilSearch.getFindOptionsWhere(search),
        };
      }

      if (sort) {
        if (sort.menu) {
          order.menu = UtilSort.getFindOptionsOrder(sort.menu);
        }
        order = {
          ...order,
          ...UtilSort.getFindOptionsOrder(sort),
        };
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
}
