import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { FrontComponentEntity } from '@modules/front-component/entity';
import { InsertFrontComponentInput } from '@modules/front-component/dto';

@InputType()
@ArgsType()
export class UpdateFrontComponentInput extends IntersectionType(
  PickType(FrontComponentEntity, ['id']),
  PartialType(InsertFrontComponentInput),
) {}
