import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';

@InputType()
@ArgsType()
export class MessageGroupEntitiesInput {
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
