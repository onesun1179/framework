import { Repository } from 'typeorm';
import { AllFrontComponentEntity } from '@modules/front-component/entity';
import {
  InsertAllFrontComponentInput,
  UpdateAllFrontComponentInput,
} from '@modules/front-component/dto';
import { CustomRepository } from '@common/decorator/CustomRepository';

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
