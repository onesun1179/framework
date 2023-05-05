import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { UserOutput } from '@modules/user/dto/output/entity/user.output';
import { InsertUserInput } from '@modules/user/dto/input/insert-user.input';

@InputType()
@ArgsType()
export class UpdateUserInput extends IntersectionType(
  PickType(UserOutput, ['id']),
  PartialType(InsertUserInput),
) {}
