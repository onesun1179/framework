import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { MessageEntity } from '@modules/message/entity/message.entity';

@InputType()
@ArgsType()
export class InsertMessageInput extends PickType(MessageEntity, [
  'text',
  'code',
  'groupCode',
  'name',
]) {}
