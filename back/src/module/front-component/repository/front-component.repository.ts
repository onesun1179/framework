import { Repository } from 'typeorm';
import { FrontComponentEntity } from '@modules/front-component/entity';
import { CustomRepository } from '@common/decorator/CustomRepository';
import {
  InsertFrontComponentInput,
  UpdateFrontComponentInput,
} from '@modules/front-component/dto/input';

@CustomRepository(FrontComponentEntity)
export class FrontComponentRepository extends Repository<FrontComponentEntity> {
  async saveCustom(p: InsertFrontComponentInput | UpdateFrontComponentInput) {
    const frontComponent = await FrontComponentEntity.create({
      id: p.id,
    }).save();

    return frontComponent;
  }
}
