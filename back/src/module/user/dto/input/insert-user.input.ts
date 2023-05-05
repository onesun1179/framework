import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { UserOutput } from '@modules/user/dto/output/entity/user.output';

@InputType()
@ArgsType()
export class InsertUserInput extends PickType(UserOutput, [
  'id',
  'name',
  'email',
  'roleSeqNo',
]) {}
