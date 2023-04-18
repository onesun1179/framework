import { Repository } from 'typeorm';

import { CustomRepository } from '@common/decorator/CustomRepository';
import { AllFrontComponentEntity } from '@modules/front-component/dto/output/entity/all-front-component.entity';
import { InsertAllFrontComponentEntityInput } from '@modules/front-component/dto/input/insert-all-front-component-entity.input';
import { UpdateAllFrontComponentEntityInput } from '@modules/front-component/dto/input/update-all-front-component-entity.input';

@CustomRepository(AllFrontComponentEntity)
export class AllFrontComponentEntityRepository extends Repository<AllFrontComponentEntity> {
  async saveCustom(
    p: InsertAllFrontComponentEntityInput | UpdateAllFrontComponentEntityInput,
  ) {
    const allFrontComponent = await AllFrontComponentEntity.create({
      id: p.id,
    }).save();

    return allFrontComponent;
  }
}
