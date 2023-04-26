import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { AllFrontComponentEntity } from '@modules/front-component/dto/output/entity/all-front-component.entity';

@InputType()
@ArgsType()
export class InsertAllFrontComponentEntityInput extends PickType(
  AllFrontComponentEntity,
  ['id', 'frontComponentId', 'desc'],
) {}
