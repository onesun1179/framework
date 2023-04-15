import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';
import { BetweenNumberSearchInput } from '@common/dto/input/search/number/between.number.search.input';
import { EqualNumberSearchInput } from '@common/dto/input/search/number/equal.number.search.input';
import { NonNullableAnyNumberSearchInput } from '@common/dto/input/search/number/non-nullable-any.number.search.input';
import { Type } from 'class-transformer';
import { NonNullableInNumberSearchInput } from '@common/dto/input/search/number/non-nullable-in.number.search.input';

@InputType()
@ArgsType()
export class NonNullableNumberSearchInput {
  @Field(() => EqualNumberSearchInput, {
    nullable: true,
  })
  @Type(() => EqualNumberSearchInput)
  equal?: Nullable<EqualNumberSearchInput>;

  @Field(() => NonNullableAnyNumberSearchInput, {
    nullable: true,
  })
  @Type(() => NonNullableAnyNumberSearchInput)
  any?: Nullable<NonNullableAnyNumberSearchInput>;

  @Field(() => NonNullableInNumberSearchInput, {
    nullable: true,
  })
  @Type(() => NonNullableInNumberSearchInput)
  in?: Nullable<NonNullableInNumberSearchInput>;

  @Field(() => Int, {
    nullable: true,
  })
  lessThan?: Nullable<number>;

  @Field(() => Int, {
    nullable: true,
  })
  lessThanOrEqual?: Nullable<number>;

  @Field(() => Int, {
    nullable: true,
  })
  moreThan?: Nullable<number>;

  @Field(() => Int, {
    nullable: true,
  })
  moreThanOrEqual?: Nullable<number>;

  @Field(() => BetweenNumberSearchInput, {
    nullable: true,
  })
  @Type(() => BetweenNumberSearchInput)
  between?: Nullable<BetweenNumberSearchInput>;
}
