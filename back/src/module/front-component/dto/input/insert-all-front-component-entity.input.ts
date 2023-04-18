import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { AllFrontComponentEntity } from '@modules/front-component/dto/output/entity/all-front-component.entity';

@InputType()
@ArgsType()
export class InsertAllFrontComponentEntityInput extends IntersectionType(
  PickType(AllFrontComponentEntity, ['id']),
  PickType(PartialType(AllFrontComponentEntity), ['frontComponentId']),
) {}
