import { CustomRepository } from '@common/decorator/CustomRepository';
import { FindOptionsOrder, Repository } from 'typeorm';
import { Nullable } from 'src/common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';
import { MenusInput } from '@modules/menu/dto/input/menus.input';
import { MenusOutput } from '@modules/menu/dto/output/menus.output';
import { UtilPaging } from '@common/util/Util.paging';

@CustomRepository(MenuOutput)
export class MenuRepository extends Repository<MenuOutput> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    menusInput: Nullable<MenusInput>,
  ): Promise<MenusOutput> {
    const qb = this.createQueryBuilder('menu');
    const order: FindOptionsOrder<MenuOutput> = {};
    let where: FindOptionsWhere<MenuOutput> = {};

    if (menusInput) {
      const { search, sort } = menusInput;
      search && (where = UtilSearch.getSearchWhere(search));

      console.log('search?.role open');
      search?.role &&
        (where.menuRoleMaps = UtilSearch.getSearchWhere(search.role));
      console.log('search?.role close');
      console.log(search?.role);
      console.log(where.menuRoleMaps);

      console.log(where);
      sort && UtilSort.setSortByQB(qb, sort);
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
