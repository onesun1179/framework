import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class NonNullableAnyNumberSearchInput {
  @Field(() => [Int])
  value!: Array<number>;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
  })
  not!: boolean;
}
