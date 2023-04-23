import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class IsNullStringSearchInput {
  @Field(() => Boolean)
  value!: boolean;
}
