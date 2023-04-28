import { CustomRepository } from '@common/decorator/CustomRepository';
import { FindOptionsOrder, Repository } from 'typeorm';
import { IconLabelOutput } from '@modules/icon/dto/output/entity/icon-label.output';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { IconOutput } from '@modules/icon/dto/output/entity/icon.output';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { IconLabelsInput } from '@modules/icon/dto/input/icon-labels.input';
import { IconLabelsOutput } from '@modules/icon/dto/output/icon-labels.output';

@CustomRepository(IconLabelOutput)
export class IconLabelRepository extends Repository<IconLabelOutput> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    iconLabelsInput: Nullable<IconLabelsInput>,
  ): Promise<IconLabelsOutput> {
    const qb = this.createQueryBuilder('ils');
    const order: FindOptionsOrder<IconOutput> = {};
    const where: FindOptionsWhere<IconOutput> = {};

    if (iconLabelsInput) {
      const { search, sort } = iconLabelsInput;
      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb.setFindOptions({
        where,
        order,
      }),
      classRef: IconLabelsOutput,
    });
  }
}
