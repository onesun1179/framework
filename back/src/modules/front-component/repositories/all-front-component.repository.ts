import { Repository } from 'typeorm';
import { CustomRepository } from '@common/docorator/CustomRepository';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';

@CustomRepository(AllFrontComponent)
export class AllFrontComponentRepository extends Repository<AllFrontComponent> {}
