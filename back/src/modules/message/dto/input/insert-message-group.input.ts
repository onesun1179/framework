import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { MessageGroup } from '@modules/message/entities/message-group';
import { Message } from '@modules/message/entities/message';
import { Nullable } from '@common/types';

@InputType()
@ArgsType()
export class InsertMessageGroupInput extends PickType(MessageGroup, [
  'name',
  'code',
]) {
  @Field(() => [Int], {
    nullable: true,
  })
  messageSeqNos!: Nullable<Array<Message['seqNo']>>;
}
