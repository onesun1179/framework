import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { MessageGroup } from '@modules/message/entities/message-group';
import { UtilField } from '@common/utils/util.field';
import { Message } from '@modules/message/entities/message';

@InputType({
  description: UtilField.getFieldComment('message', 'group', 'insert', 'input'),
})
@ArgsType()
export class InsertMessageGroupInput extends PickType(MessageGroup, [
  'name',
  'code',
]) {
  @Field(() => [Int], {
    nullable: true,
    description: UtilField.getFieldComment('message', 'seqNo'),
  })
  messageSeqNos?: Array<Message['seqNo']>;
}
