import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';

@InputType()
@ArgsType()
export class InsertAllFrontComponentInput extends IntersectionType(
  PickType(AllFrontComponent, ['id']),
  PickType(PartialType(AllFrontComponent), ['frontComponentId']),
) {}
