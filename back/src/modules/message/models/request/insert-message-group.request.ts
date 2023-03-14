import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { MessageGroup } from '../message-group';

@InputType()
@ArgsType()
export class InsertMessageGroupRequest extends PickType(MessageGroup, [
  'name',
]) {
  @Field(() => [Int], {
    nullable: true,
    defaultValue: [],
  })
  messageSeqNos: number[];
}
