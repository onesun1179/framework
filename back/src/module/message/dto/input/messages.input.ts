import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';
import { MessagesSearchInput } from '@modules/message/dto/input/messages-search.input';
import { MessagesSortInput } from '@modules/message/dto/input/messages-sort.input';

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
