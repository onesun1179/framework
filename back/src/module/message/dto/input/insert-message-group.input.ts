import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';
import { MessageGroupEntity } from '@modules/message/entity/message-group.entity';
import { MessageEntity } from '@modules/message/entity/message.entity';

@InputType()
@ArgsType()
export class InsertMessageGroupInput extends PickType(MessageGroupEntity, [
  'name',
  'code',
]) {
  @Field(() => [Int], {
    nullable: true,
  })
  messageSeqNos!: Nullable<Array<MessageEntity['seqNo']>>;
}
