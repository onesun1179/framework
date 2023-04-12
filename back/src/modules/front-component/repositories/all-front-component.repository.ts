import { Repository } from 'typeorm';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';
import { InsertAllFrontComponentInput } from '@modules/front-component/dto/insert-all-front-component.input';
import { UpdateAllFrontComponentInput } from '@modules/front-component/dto/update-all-front-component.input';
import { CustomRepository } from '@common/docorator/CustomRepository';

@CustomRepository(AllFrontComponent)
export class AllFrontComponentRepository extends Repository<AllFrontComponent> {
  async saveCustom(
    p: InsertAllFrontComponentInput | UpdateAllFrontComponentInput,
  ) {
    const allFrontComponent = await AllFrontComponent.create({
      id: p.id,
    }).save();

    return allFrontComponent;
  }
}
