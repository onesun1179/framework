import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { FrontComponentEntity } from '@modules/front-component/dto/output/entity/front-component.entity';
import { InsertFrontComponentEntityInput } from '@modules/front-component/dto/input/insert-front-component-entity.input';
import { UpdateFrontComponentEntityInput } from '@modules/front-component/dto/input/update-front-component-entity.input';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { FrontComponentEntitiesInput } from '@modules/front-component/dto/input/front-component-entities.input';
import { FrontComponentEntitiesOutput } from '@modules/front-component/dto/output/front-component-entities.output';

@CustomRepository(FrontComponentEntity)
export class FrontComponentEntityRepository extends Repository<FrontComponentEntity> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    frontComponentEntitiesInput: Nullable<FrontComponentEntitiesInput>,
  ): Promise<FrontComponentEntitiesOutput> {
    const qb = this.createQueryBuilder('all');

    if (frontComponentEntitiesInput) {
      const { search, sort } = frontComponentEntitiesInput;

      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: FrontComponentEntitiesOutput,
    });
  }

  async saveCustom(
    p: InsertFrontComponentEntityInput | UpdateFrontComponentEntityInput,
  ) {
    const frontComponent = await FrontComponentEntity.create({
      id: p.id,
    }).save();

    return frontComponent;
  }
}
