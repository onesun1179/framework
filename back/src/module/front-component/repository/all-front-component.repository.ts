import { Repository } from 'typeorm';
import { AllFrontComponentEntity } from '@modules/front-component/entity';

import { CustomRepository } from '@common/decorator/CustomRepository';
import {
  InsertAllFrontComponentInput,
  UpdateAllFrontComponentInput,
} from '@modules/front-component/dto/input';

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
