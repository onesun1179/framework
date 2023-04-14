import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { NumberSearchInput } from '@common/dto/inputs/search/number.search.input';
import { Nullable } from '@common/types';
import { MessageGroupsInput } from '@modules/message/dto/input/message-groups.input';
import { StringSearchInput } from '@common/dto/inputs/search/string.search.input';
import { Type } from 'class-transformer';

@InputType()
@ArgsType()
export class MessagesSearchInput {
  @Field(() => NumberSearchInput, {
    nullable: true,
  })
  @Type(() => NumberSearchInput)
  seqNo?: Nullable<NumberSearchInput>;

  @Field(() => MessageGroupsInput, {
    nullable: true,
  })
  @Type(() => MessageGroupsInput)
  groupsInput?: Nullable<MessageGroupsInput>;

  @Field(() => StringSearchInput, {
    nullable: true,
  })
  @Type(() => StringSearchInput)
  text?: Nullable<StringSearchInput>;
}
