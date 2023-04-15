import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { MessageEntity, MessageGroupEntity } from '@modules/message/entity';
import { Nullable } from 'src/common/type';

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
