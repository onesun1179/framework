import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { Message } from '@modules/message/entities/message';

@InputType()
@ArgsType()
export class InsertMessageInput extends PickType(Message, [
  'text',
  'code',
  'groupCode',
  'name',
]) {}
