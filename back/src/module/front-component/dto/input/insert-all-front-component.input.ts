import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { AllFrontComponentOutput } from '@modules/front-component/dto/output/entity/all-front-component.output';

@InputType()
@ArgsType()
export class InsertAllFrontComponentInput extends PickType(
  AllFrontComponentOutput,
  ['id', 'frontComponentId', 'desc'],
) {}
