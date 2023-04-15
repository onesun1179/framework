import { Repository } from 'typeorm';
import { FrontComponentEntity } from '@modules/front-component/entity';
import {
  InsertFrontComponentInput,
  UpdateFrontComponentInput,
} from '@modules/front-component/dto';
import { CustomRepository } from '@common/decorator/CustomRepository';

@CustomRepository(FrontComponentEntity)
export class FrontComponentRepository extends Repository<FrontComponentEntity> {
  async saveCustom(p: InsertFrontComponentInput | UpdateFrontComponentInput) {
    const frontComponent = await FrontComponentEntity.create({
      id: p.id,
    }).save();

    return frontComponent;
  }
}
