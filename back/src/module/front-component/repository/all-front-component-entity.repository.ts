import { Repository } from 'typeorm';

import { CustomRepository } from '@common/decorator/CustomRepository';
import { AllFrontComponentEntity } from '@modules/front-component/dto/output/entity/all-front-component.entity';
import { InsertAllFrontComponentEntityInput } from '@modules/front-component/dto/input/insert-all-front-component-entity.input';
import { UpdateAllFrontComponentEntityInput } from '@modules/front-component/dto/input/update-all-front-component-entity.input';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { AllFrontComponentEntitiesInput } from '@modules/front-component/dto/input/all-front-component-entities.input';
import { AllFrontComponentEntitiesOutput } from '@modules/front-component/dto/output/all-front-component-entities.output';

@CustomRepository(AllFrontComponentEntity)
export class AllFrontComponentEntityRepository extends Repository<AllFrontComponentEntity> {
  async hasRow(id: string): Promise<boolean> {
    return this.exist({
      where: {
        id,
      },
    });
  }
  async paging(
    pagingInput: Nullable<PagingInput>,
    allFrontComponentEntitiesInput: Nullable<AllFrontComponentEntitiesInput>,
  ): Promise<AllFrontComponentEntitiesOutput> {
    const qb = this.createQueryBuilder('all');

    if (allFrontComponentEntitiesInput) {
      const { search, sort } = allFrontComponentEntitiesInput;

      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: AllFrontComponentEntitiesOutput,
    });
  }

  async saveCustom(
    p: InsertAllFrontComponentEntityInput | UpdateAllFrontComponentEntityInput,
  ) {
    return await AllFrontComponentEntity.create(
      AllFrontComponentEntity.create({
        id: p.id,
        frontComponentId: p.frontComponentId,
        desc: p.desc,
      }),
    ).save();
  }
}
