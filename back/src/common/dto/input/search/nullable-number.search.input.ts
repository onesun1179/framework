import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';
import { BetweenNumberSearchInput } from '@common/dto/input/search/number/between.number.search.input';
import { EqualNumberSearchInput } from '@common/dto/input/search/number/equal.number.search.input';
import { NullableInNumberSearchInput } from '@common/dto/input/search/number/nullable-in.number.search.input';
import { Type } from 'class-transformer';
import { NullableAnyNumberSearchInput } from '@common/dto/input/search/number/nullable-any.number.search.input';

@InputType()
@ArgsType()
export class NullableNumberSearchInput {
  @Field(() => EqualNumberSearchInput, {
    nullable: true,
  })
  @Type(() => EqualNumberSearchInput)
  equal?: Nullable<EqualNumberSearchInput>;

  @Field(() => NullableAnyNumberSearchInput, {
    nullable: true,
  })
  @Type(() => NullableAnyNumberSearchInput)
  any?: Nullable<NullableAnyNumberSearchInput>;

  @Field(() => NullableInNumberSearchInput, {
    nullable: true,
  })
  @Type(() => NullableInNumberSearchInput)
  in?: Nullable<NullableInNumberSearchInput>;

  @Field(() => Boolean, {
    nullable: true,
  })
  isNull?: Nullable<boolean>;

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
