import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { InsertFrontComponentInput } from '@modules/front-component/dto/insert-front-component.input';

@InputType()
@ArgsType()
export class UpdateFrontComponentInput extends IntersectionType(
  PickType(FrontComponent, ['id']),
  PartialType(InsertFrontComponentInput),
) {}
