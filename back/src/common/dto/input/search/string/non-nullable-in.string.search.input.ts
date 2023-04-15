import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class NonNullableInStringSearchInput {
  @Field(() => [String])
  value!: Array<string>;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
  })
  not!: boolean;
}
