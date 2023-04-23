import { CustomRepository } from '@common/decorator/CustomRepository';
import { FindOptionsOrder, Repository } from 'typeorm';
import { Nullable } from 'src/common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { MenuEntitiesInput } from '@modules/menu/dto/input/menu-entities.input';
import { MenuEntitiesOutput } from '@modules/menu/dto/output/menu-entities.output';
import { UtilPaging } from '@common/util/Util.paging';

@CustomRepository(MenuEntity)
export class MenuEntityRepository extends Repository<MenuEntity> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    menusInput: Nullable<MenuEntitiesInput>,
  ): Promise<MenuEntitiesOutput> {
    const qb = this.createQueryBuilder('menu');
    const order: FindOptionsOrder<MenuEntity> = {};
    const where: FindOptionsWhere<MenuEntity> = {};

    if (menusInput) {
      const { search, sort } = menusInput;
      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
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
