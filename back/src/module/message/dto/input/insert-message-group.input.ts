import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { MessageGroupOutput } from '@modules/message/dto/output/entity/message-group.output';

@InputType()
@ArgsType()
export class InsertMessageGroupInput extends PickType(MessageGroupOutput, [
  'name',
  'code',
  'desc',
]) {}
