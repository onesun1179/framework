import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';
import { Type } from 'class-transformer';
import { MessageGroupsSortInput } from '@modules/message/dto/input/message-groups-sort.input';
import { MessageGroupsSearchInput } from '@modules/message/dto/input/message-groups-search.input';

@InputType()
@ArgsType()
export class MessageGroupsInput {
  @Field(() => MessageGroupsSearchInput, {
    nullable: true,
  })
  @Type(() => MessageGroupsSearchInput)
  search?: Nullable<MessageGroupsSearchInput>;

  @Field(() => MessageGroupsSortInput, {
    nullable: true,
  })
  @Type(() => MessageGroupsSortInput)
  sort?: Nullable<MessageGroupsSortInput>;
}
