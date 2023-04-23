import { CustomRepository } from '@common/decorator/CustomRepository';
import { FindOptionsOrder, Repository } from 'typeorm';
import { MenuRoleMapEntity } from '@modules/menu/dto/output/entity/menu-role-map.entity';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { MenuRoleMapEntitiesInput } from '@modules/menu/dto/input/menu-role-map-entities.input';
import { MenuRoleMapEntitiesOutput } from '@modules/menu/dto/output/menu-role-map-entities.output';

@CustomRepository(MenuRoleMapEntity)
export class MenuRoleMapEntityRepository extends Repository<MenuRoleMapEntity> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    menuByAuthsInput: Nullable<MenuRoleMapEntitiesInput>,
  ): Promise<MenuRoleMapEntitiesOutput> {
    const qb = this.createQueryBuilder('menuRoleMap');
    const order: FindOptionsOrder<MenuRoleMapEntity> = {};
    let where: FindOptionsWhere<MenuRoleMapEntity> = {};

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
      classRef: MenuEntity,
    });
  }
}
