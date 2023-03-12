import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';

@InputType()
@ArgsType()
export class UpdateAllFrontComponentRequest extends IntersectionType(
  PickType(AllFrontComponent, ['id']),
  PickType(PartialType(AllFrontComponent), ['frontComponentId']),
) {}
