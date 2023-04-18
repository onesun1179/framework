import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';
import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import { Type } from 'class-transformer';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';
import { MessageGroupEntitiesInput } from '@modules/message/dto/input/message-group-entities.input';

@InputType()
@ArgsType()
export class MessageEntitiesSearchInput {
  @Field(() => NonNullableNumberSearchInput, {
    nullable: true,
  })
  @Type(() => NonNullableNumberSearchInput)
  seqNo?: Nullable<NonNullableNumberSearchInput>;

  @Field(() => MessageGroupEntitiesInput, {
    nullable: true,
  })
  @Type(() => MessageGroupEntitiesInput)
  groupsInput?: Nullable<MessageGroupEntitiesInput>;

  @Field(() => NonNullableStringSearchInput, {
    nullable: true,
  })
  @Type(() => NonNullableStringSearchInput)
  text?: Nullable<NonNullableStringSearchInput>;
}
