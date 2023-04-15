import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';
import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import { Type } from 'class-transformer';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';
import { MessageGroupsInput } from '@modules/message/dto/input/message-groups.input';

@InputType()
@ArgsType()
export class MessagesSearchInput {
  @Field(() => NonNullableNumberSearchInput, {
    nullable: true,
  })
  @Type(() => NonNullableNumberSearchInput)
  seqNo?: Nullable<NonNullableNumberSearchInput>;

  @Field(() => MessageGroupsInput, {
    nullable: true,
  })
  @Type(() => MessageGroupsInput)
  groupsInput?: Nullable<MessageGroupsInput>;

  @Field(() => NonNullableStringSearchInput, {
    nullable: true,
  })
  @Type(() => NonNullableStringSearchInput)
  text?: Nullable<NonNullableStringSearchInput>;
}
