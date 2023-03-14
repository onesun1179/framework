import { ArgsType, Field, InputType, PickType } from '@nestjs/graphql';
import { Message } from '../message';

@InputType()
@ArgsType()
export class UpdateMessageRequest extends PickType(Message, ['seqNo']) {
  @Field({
    nullable: true,
  })
  text: string;

  @Field({
    nullable: true,
  })
  messageGroupCode: string;
}
