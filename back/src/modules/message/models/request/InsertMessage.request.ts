import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { Message } from '../Message';
import { UtilField } from '@util/Util.field';

@InputType({
  description: UtilField.getFieldComment('message', 'insert', 'req'),
})
@ArgsType()
export class InsertMessageRequest extends PickType(Message, [
  'text',
  'messageGroupCode',
]) {}
