import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { MessageGroupsInput } from '@modules/message/dto/input/message-groups.input';
import { StringSearchInput } from '@common/dto/inputs/string-search.input';

@InputType()
@ArgsType()
export class MessagesInput {
  @Field(() => [Int], {
    nullable: true,
  })
  seqNos?: Array<number>;

  @Field(() => MessageGroupsInput, {
    nullable: true,
  })
  groupsInput: MessageGroupsInput;

  @Field(() => StringSearchInput, {
    nullable: true,
  })
  text?: StringSearchInput;
}
