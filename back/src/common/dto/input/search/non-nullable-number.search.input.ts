import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';
import { BetweenNumberSearchInput } from '@common/dto/input/search/number/between.number.search.input';
import { EqualNumberSearchInput } from '@common/dto/input/search/number/equal.number.search.input';
import { NonNullableAnyNumberSearchInput } from '@common/dto/input/search/number/non-nullable-any.number.search.input';
import { Type } from 'class-transformer';
import { NonNullableInNumberSearchInput } from '@common/dto/input/search/number/non-nullable-in.number.search.input';
import { LessThanNumberSearchInput } from '@common/dto/input/search/number/less-than.number.search.input';
import { MoreThanNumberSearchInput } from '@common/dto/input/search/number/more-than.number.search.input';

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

  @Field(() => LessThanNumberSearchInput, {
    nullable: true,
  })
  lessThan?: Nullable<LessThanNumberSearchInput>;

  @Field(() => MoreThanNumberSearchInput, {
    nullable: true,
  })
  moreThan?: Nullable<MoreThanNumberSearchInput>;

  @Field(() => BetweenNumberSearchInput, {
    nullable: true,
  })
  @Type(() => BetweenNumberSearchInput)
  between?: Nullable<BetweenNumberSearchInput>;
}
