import { Repository } from 'typeorm';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { InsertFrontComponentInput } from '@modules/front-component/dto/insert-front-component.input';
import { UpdateFrontComponentInput } from '@modules/front-component/dto/update-front-component.input';
import { CustomRepository } from '@common/docorator/CustomRepository';

@CustomRepository(FrontComponent)
export class FrontComponentRepository extends Repository<FrontComponent> {
  async saveCustom(p: InsertFrontComponentInput | UpdateFrontComponentInput) {
    const frontComponent = await FrontComponent.create({
      id: p.id,
    }).save();

    return frontComponent;
  }
}
