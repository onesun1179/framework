import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';
import { MessageGroupEntity } from '@modules/message/dto/output/entity/message-group.entity';
import { MessageEntity } from '@modules/message/dto/output/entity/message.entity';

@InputType()
@ArgsType()
export class InsertMessageGroupEntityInput extends PickType(
  MessageGroupEntity,
  ['name', 'code'],
) {
  @Field(() => [Int], {
    nullable: true,
  })
  messageSeqNos!: Nullable<Array<MessageEntity['seqNo']>>;
}
