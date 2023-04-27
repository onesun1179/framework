import { CustomRepository } from '@common/decorator/CustomRepository';
import { FindOptionsOrder, Repository } from 'typeorm';
import { MenuRoleMapOutput } from '@modules/menu/dto/output/entity/menu-role-map.output';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { MenuRoleMapsInput } from '@modules/menu/dto/input/menu-role-maps.input';
import { MenuRoleMapsOutput } from '@modules/menu/dto/output/menu-role-maps.output';

@CustomRepository(MenuRoleMapOutput)
export class MenuRoleMapRepository extends Repository<MenuRoleMapOutput> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    menuByAuthsInput: Nullable<MenuRoleMapsInput>,
  ): Promise<MenuRoleMapsOutput> {
    const qb = this.createQueryBuilder('menuRoleMap');
    const order: FindOptionsOrder<MenuRoleMapOutput> = {};
    let where: FindOptionsWhere<MenuRoleMapOutput> = {};

    if (menuByAuthsInput) {
      const { search, sort } = menuByAuthsInput;

      if (search) {
        if (search.menu) {
          where.menu = UtilSearch.getSearchWhere(search.menu);
        }
        where = UtilSearch.getSearchWhere(search);
      }

      if (sort) {
        UtilSort.setSortByQB(qb, sort);
      }
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
