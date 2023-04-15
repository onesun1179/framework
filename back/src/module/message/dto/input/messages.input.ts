import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { MessagesSearchInput, MessagesSortInput } from '@modules/message/dto';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';

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
