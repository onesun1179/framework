import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { MessagesSearchInput } from '@modules/message/dto/input/search/messages.search.input';
import { MessagesSortInput } from '@modules/message/dto/input/sort/messages.sort.input';
import { Type } from 'class-transformer';
import { Nullable } from '@common/types';

@InputType()
@ArgsType()
export class MessagesInput {
  @Field(() => MessagesSearchInput, {
    nullable: true,
  })
  @Type(() => MessagesSearchInput)
  search?: Nullable<MessagesSearchInput>;

  @Field(() => MessagesSortInput, {
    nullable: true,
  })
  @Type(() => MessagesSortInput)
  sort?: Nullable<MessagesSortInput>;
}
