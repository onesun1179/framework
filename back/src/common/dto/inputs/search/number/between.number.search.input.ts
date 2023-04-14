import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class BetweenNumberSearchInput {
  @Field(() => Int)
  from!: number;

  @Field(() => Int)
  to!: number;
}
