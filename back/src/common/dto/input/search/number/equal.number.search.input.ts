import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class EqualNumberSearchInput {
  @Field(() => Int)
  value!: number;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
  })
  not!: boolean;
}
