import { CustomRepository } from '@common/decorator/CustomRepository';
import { FindOptionsOrder, Repository } from 'typeorm';
import { IconOutput } from '@modules/icon/dto/output/entity/icon.output';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { IconsInput } from '@modules/icon/dto/input/icons.input';
import { IconsOutput } from '@modules/icon/dto/output/icons.output';

@CustomRepository(IconOutput)
export class IconRepository extends Repository<IconOutput> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    iconsInput: Nullable<IconsInput>,
  ): Promise<IconsOutput> {
    const qb = this.createQueryBuilder('i');
    let order: FindOptionsOrder<IconOutput> = {};
    let where: FindOptionsWhere<IconOutput> = {};

    if (iconsInput) {
      const { search, sort } = iconsInput;
      if (search) {
        where ??= {};
        if (search.iconLabel) {
          where = {
            iconsIconLabelsList: {
              iconLabel: UtilSearch.getSearchWhere(search.iconLabel),
            },
          };
        }
        where = {
          ...where,
          ...UtilSearch.getSearchWhere(search),
        };
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
      classRef: IconsOutput,
    });
  }
}
