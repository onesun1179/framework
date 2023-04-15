import { CustomRepository } from '@common/decorator/CustomRepository';
import { MenuEntity } from '@modules/menu/entity';
import { FindOptionsOrder, Repository } from 'typeorm';
import { Nullable } from 'src/common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@util';
import { MenusInput } from '@modules/menu/dto/input';
import { MenusOutput } from '@modules/menu/dto/output';

@CustomRepository(MenuEntity)
export class MenuRepository extends Repository<MenuEntity> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    menusInput: Nullable<MenusInput>,
  ): Promise<MenusOutput> {
    const qb = this.createQueryBuilder('menu');
    let order: FindOptionsOrder<MenuEntity> = {};
    let where: FindOptionsWhere<MenuEntity> = {};

    if (menusInput) {
      const { search, sort } = menusInput;

      if (search) {
        where = UtilSearch.getFindOptionsWhere(search);
      }

      if (sort) {
        order = UtilSort.getFindOptionsOrder(sort);
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
