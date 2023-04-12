import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Nullable } from '@common/types';

@InputType()
@ArgsType()
export class MessageGroupsInput {
  @Field(() => String, {
    nullable: true,
  })
  code?: Nullable<string>;
  @Field(() => [String], {
    nullable: true,
  })
  codes?: Nullable<Array<string>>;

  @Field(() => String, {
    nullable: true,
  })
  name?: Nullable<string>;
}
