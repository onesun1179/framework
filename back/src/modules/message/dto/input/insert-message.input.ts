import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { Message } from '@modules/message/entities/message';
import { UtilField } from '@common/utils/util.field';

@InputType({
  description: UtilField.getFieldComment('message', 'insert', 'input'),
})
@ArgsType()
export class InsertMessageInput extends PickType(Message, [
  'text',
  'code',
  'groupCode',
  'name',
]) {}
