import { ArgsType, Field, InputType, PickType } from '@nestjs/graphql';
import { Message } from '../message';
import { UtilField } from '@util/Util.field';

@InputType({
  description: UtilField.getFieldComment('message', 'insert', 'req'),
})
@ArgsType()
export class UpdateMessageRequest extends PickType(Message, ['seqNo']) {
  @Field({
    description: UtilField.getFieldComment('msg', 'content'),
    nullable: true,
  })
  text: string;

  @Field({
    description: UtilField.getFieldComment('msg', 'group', 'code'),
    nullable: true,
  })
  messageGroupCode: string;
}
