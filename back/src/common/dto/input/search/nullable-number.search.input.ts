import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';
import { BetweenNumberSearchInput } from '@common/dto/input/search/number/between.number.search.input';
import { EqualNumberSearchInput } from '@common/dto/input/search/number/equal.number.search.input';
import { NullableInNumberSearchInput } from '@common/dto/input/search/number/nullable-in.number.search.input';
import { Type } from 'class-transformer';
import { NullableAnyNumberSearchInput } from '@common/dto/input/search/number/nullable-any.number.search.input';
import { LessThanNumberSearchInput } from '@common/dto/input/search/number/less-than.number.search.input';
import { MoreThanNumberSearchInput } from '@common/dto/input/search/number/more-than.number.search.input';
import { IsNullNumberSearchInput } from '@common/dto/input/search/number/is-null.number.search.input';

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

  @Field(() => IsNullNumberSearchInput, {
    nullable: true,
  })
  isNull?: Nullable<IsNullNumberSearchInput>;

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
