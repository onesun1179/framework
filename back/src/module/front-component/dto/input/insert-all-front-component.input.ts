import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { AllFrontComponentEntity } from '@modules/front-component/entity';

@InputType()
@ArgsType()
export class InsertAllFrontComponentInput extends IntersectionType(
  PickType(AllFrontComponentEntity, ['id']),
  PickType(PartialType(AllFrontComponentEntity), ['frontComponentId']),
) {}
