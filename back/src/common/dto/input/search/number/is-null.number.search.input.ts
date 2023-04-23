import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class IsNullNumberSearchInput {
  @Field(() => Boolean)
  value!: boolean;
}
