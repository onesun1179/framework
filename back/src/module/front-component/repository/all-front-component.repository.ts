import { Repository } from 'typeorm';

import { CustomRepository } from '@common/decorator/CustomRepository';
import { AllFrontComponentOutput } from '@modules/front-component/dto/output/entity/all-front-component.output';
import { InsertAllFrontComponentInput } from '@modules/front-component/dto/input/insert-all-front-component.input';
import { UpdateAllFrontComponentInput } from '@modules/front-component/dto/input/update-all-front-component.input';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { AllFrontComponentsInput } from '@modules/front-component/dto/input/all-front-components.input';
import { AllFrontComponentsOutput } from '@modules/front-component/dto/output/all-front-components.output';

@CustomRepository(AllFrontComponentOutput)
export class AllFrontComponentRepository extends Repository<AllFrontComponentOutput> {
  async hasRow(id: string): Promise<boolean> {
    return this.exist({
      where: {
        id,
      },
    });
  }
  async paging(
    pagingInput: Nullable<PagingInput>,
    allFrontComponentEntitiesInput: Nullable<AllFrontComponentsInput>,
  ): Promise<AllFrontComponentsOutput> {
    const qb = this.createQueryBuilder('all');

    if (allFrontComponentEntitiesInput) {
      const { search, sort } = allFrontComponentEntitiesInput;

      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: AllFrontComponentsOutput,
    });
  }

  async saveCustom(
    p: InsertAllFrontComponentInput | UpdateAllFrontComponentInput,
  ) {
    return await AllFrontComponentOutput.create(
      AllFrontComponentOutput.create({
        id: p.id,
        frontComponentId: p.frontComponentId,
        desc: p.desc,
      }),
    ).save();
  }
}
