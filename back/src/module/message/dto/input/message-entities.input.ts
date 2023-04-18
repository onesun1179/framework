import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';
import { MessageEntitiesSearchInput } from '@modules/message/dto/input/message-entities-search.input';
import { MessageEntitiesSortInput } from '@modules/message/dto/input/message-entities-sort.input';

@InputType()
@ArgsType()
export class MessageEntitiesInput {
  @Field(() => MessageEntitiesSearchInput, {
    nullable: true,
  })
  @Type(() => MessageEntitiesSearchInput)
  search?: Nullable<MessageEntitiesSearchInput>;

  @Field(() => MessageEntitiesSortInput, {
    nullable: true,
  })
  @Type(() => MessageEntitiesSortInput)
  sort?: Nullable<MessageEntitiesSortInput>;
}
