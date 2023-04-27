import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { MessageOutput } from '@modules/message/dto/output/entity/message.output';

@InputType()
@ArgsType()
export class InsertMessageInput extends PickType(MessageOutput, [
  'text',
  'code',
  'groupCode',
  'name',
  'desc',
]) {}
