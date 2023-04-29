import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from '@common/type';
import { CodesSearchInput } from '@modules/code/dto/input/search/codes.search.input';
import { CodesSortInput } from '@modules/code/dto/input/sort/codes.sort.input';

@InputType()
@ArgsType()
export class CodesInput {
  @Field(() => CodesSearchInput, {
    nullable: true,
  })
  @Type(() => CodesSearchInput)
  search?: Nullable<CodesSearchInput>;

  @Field(() => CodesSortInput, {
    nullable: true,
  })
  @Type(() => CodesSortInput)
  sort?: Nullable<CodesSortInput>;
}
