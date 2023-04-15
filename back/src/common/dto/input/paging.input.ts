import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Nullable } from 'src/common/type';

@InputType()
@ArgsType()
export class PagingInput {
  @Field(() => Int, {
    nullable: true,
  })
  @Min(0)
  @IsInt()
  @IsOptional()
  skip?: Nullable<number>;

  @Field(() => Int, {
    nullable: true,
  })
  @Min(1)
  @Max(50)
  @IsInt()
  @IsOptional()
  take?: Nullable<number>;
}
