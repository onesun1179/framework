import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { FrontComponentOutput } from '@modules/front-component/dto/output/entity/front-component.output';
import { InsertFrontComponentInput } from '@modules/front-component/dto/input/insert-front-component.input';
import { UpdateFrontComponentInput } from '@modules/front-component/dto/input/update-front-component.input';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { FrontComponentsInput } from '@modules/front-component/dto/input/front-components.input';
import { FrontComponentsOutput } from '@modules/front-component/dto/output/front-components.output';

@CustomRepository(FrontComponentOutput)
export class FrontComponentRepository extends Repository<FrontComponentOutput> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    frontComponentEntitiesInput: Nullable<FrontComponentsInput>,
  ): Promise<FrontComponentsOutput> {
    const qb = this.createQueryBuilder('all');

    if (frontComponentEntitiesInput) {
      const { search, sort } = frontComponentEntitiesInput;

      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: FrontComponentsOutput,
    });
  }

  async saveCustom(p: InsertFrontComponentInput | UpdateFrontComponentInput) {
    const frontComponent = await FrontComponentOutput.create({
      id: p.id,
    }).save();

    return frontComponent;
  }
}
