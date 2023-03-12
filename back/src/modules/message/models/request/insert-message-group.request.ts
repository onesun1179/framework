import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';
import { MessageGroup } from '../message-group';

@InputType({
  description: UtilField.getFieldComment('message', 'group', 'insert', 'req'),
})
@ArgsType()
export class InsertMessageGroupRequest extends PickType(MessageGroup, [
  'name',
]) {
  @Field(() => [Int], {
    nullable: true,
    defaultValue: [],
    description: UtilField.getFieldComment('msg', 'seqNo', 's'),
  })
  messageSeqNos: number[];
}
