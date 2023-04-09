import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';

@InputType()
@ArgsType()
export class PagingInput {
  @Field(() => Int)
  @Min(0)
  @IsOptional()
  skip: number;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  @IsOptional()
  take: number;
}
