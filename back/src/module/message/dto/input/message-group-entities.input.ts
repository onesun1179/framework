import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';
import { Type } from 'class-transformer';
import { MessageGroupEntitiesSortInput } from '@modules/message/dto/input/message-group-entities-sort.input';
import { MessageGroupEntitiesSearchInput } from '@modules/message/dto/input/message-group-entities-search.input';

@InputType()
@ArgsType()
export class MessageGroupEntitiesInput {
  @Field(() => MessageGroupEntitiesSearchInput, {
    nullable: true,
  })
  @Type(() => MessageGroupEntitiesSearchInput)
  search?: Nullable<MessageGroupEntitiesSearchInput>;

  @Field(() => MessageGroupEntitiesSortInput, {
    nullable: true,
  })
  @Type(() => MessageGroupEntitiesSortInput)
  sort?: Nullable<MessageGroupEntitiesSortInput>;
}
