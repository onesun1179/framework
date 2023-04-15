import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { InsertFrontComponentInput } from '@modules/front-component/dto/input/insert-front-component.input';
import { FrontComponentEntity } from '@modules/front-component/entity/front-component.entity';

@InputType()
@ArgsType()
export class UpdateFrontComponentInput extends IntersectionType(
  PickType(FrontComponentEntity, ['id']),
  PartialType(InsertFrontComponentInput),
) {}
