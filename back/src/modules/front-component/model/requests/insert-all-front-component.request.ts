import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';

@InputType()
@ArgsType()
export class InsertAllFrontComponentRequest extends PickType(
  AllFrontComponent,
  ['id', 'frontComponentId'],
) {}
