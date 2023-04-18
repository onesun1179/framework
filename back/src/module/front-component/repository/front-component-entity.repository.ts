import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { FrontComponentEntity } from '@modules/front-component/dto/output/entity/front-component.entity';
import { InsertFrontComponentEntityInput } from '@modules/front-component/dto/input/insert-front-component-entity.input';
import { UpdateFrontComponentEntityInput } from '@modules/front-component/dto/input/update-front-component-entity.input';

@CustomRepository(FrontComponentEntity)
export class FrontComponentEntityRepository extends Repository<FrontComponentEntity> {
  async saveCustom(
    p: InsertFrontComponentEntityInput | UpdateFrontComponentEntityInput,
  ) {
    const frontComponent = await FrontComponentEntity.create({
      id: p.id,
    }).save();

    return frontComponent;
  }
}
