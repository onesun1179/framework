import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class PagingParam {
  @Field(() => Int)
  @Min(0)
  skip;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take;
}
