import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Nullable } from '@common/types';
import { BetweenNumberSearchInput } from '@common/dto/inputs/search/number/between.number.search.input';
import { EqualNumberSearchInput } from '@common/dto/inputs/search/number/equal.number.search.input';
import { AnyNumberSearchInput } from '@common/dto/inputs/search/number/any.number.search.input';
import { InNumberSearchInput } from '@common/dto/inputs/search/number/in.number.search.input';
import { Type } from 'class-transformer';

@InputType()
@ArgsType()
export class NumberSearchInput {
  @Field(() => EqualNumberSearchInput, {
    nullable: true,
  })
  @Type(() => EqualNumberSearchInput)
  equal?: Nullable<EqualNumberSearchInput>;

  @Field(() => AnyNumberSearchInput, {
    nullable: true,
  })
  @Type(() => AnyNumberSearchInput)
  any?: Nullable<AnyNumberSearchInput>;

  @Field(() => InNumberSearchInput, {
    nullable: true,
  })
  @Type(() => InNumberSearchInput)
  in?: Nullable<InNumberSearchInput>;

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
