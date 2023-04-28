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
import { InsertMenuInput } from '@modules/menu/dto/input/insert-menu.input';
import { UpdateMenuInput } from '@modules/menu/dto/input/update-menu.input';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';

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

  async hasRow(seqNo: number) {
    return await this.exist({
      where: {
        seqNo,
      },
    });
  }

  async saveCustom(p: InsertMenuInput | UpdateMenuInput): Promise<MenuOutput> {
    return await this.save(
      MenuOutput.create({
        seqNo:
          p instanceof UpdateMenuInput
            ? await (async () => {
                if (await this.hasRow(p.seqNo)) {
                  return p.seqNo;
                } else {
                  throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
                }
              })()
            : undefined,
        name: p.name,
        iconSeqNo: p.iconSeqNo,
        routeSeqNo: p.routeSeqNo,
        desc: p.desc,
      }),
    );
  }
}
