import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { FrontComponentEntity } from '../entity/front-component.entity';
import { InsertFrontComponentInput } from '@modules/front-component/dto/input/insert-front-component.input';
import { UpdateFrontComponentInput } from '@modules/front-component/dto/input/update-front-component.input';

@CustomRepository(FrontComponentEntity)
export class FrontComponentRepository extends Repository<FrontComponentEntity> {
  async saveCustom(p: InsertFrontComponentInput | UpdateFrontComponentInput) {
    const frontComponent = await FrontComponentEntity.create({
      id: p.id,
    }).save();

    return frontComponent;
  }
}
