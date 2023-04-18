import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { InsertFrontComponentEntityInput } from '@modules/front-component/dto/input/insert-front-component-entity.input';
import { FrontComponentEntity } from '@modules/front-component/dto/output/entity/front-component.entity';

@InputType()
@ArgsType()
export class UpdateFrontComponentEntityInput extends IntersectionType(
  PickType(FrontComponentEntity, ['id']),
  PartialType(InsertFrontComponentEntityInput),
) {}
