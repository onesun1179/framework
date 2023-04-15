import { Repository } from 'typeorm';

import { CustomRepository } from '@common/decorator/CustomRepository';
import { AllFrontComponentEntity } from '@modules/front-component/entity/all-front-component.entity';
import { InsertAllFrontComponentInput } from '@modules/front-component/dto/input/insert-all-front-component.input';
import { UpdateAllFrontComponentInput } from '@modules/front-component/dto/input/update-all-front-component.input';

@CustomRepository(AllFrontComponentEntity)
export class AllFrontComponentRepository extends Repository<AllFrontComponentEntity> {
  async saveCustom(
    p: InsertAllFrontComponentInput | UpdateAllFrontComponentInput,
  ) {
    const allFrontComponent = await AllFrontComponentEntity.create({
      id: p.id,
    }).save();

    return allFrontComponent;
  }
}
