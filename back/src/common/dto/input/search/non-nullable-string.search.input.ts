import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { RegexStringSearchInput } from '@common/dto/input/search/string/regex.string.search.input';
import { LikeStringSearchInput } from '@common/dto/input/search/string/like.string.search.input';
import { Nullable } from 'src/common/type';
import { IlikeStringSearchInput } from '@common/dto/input/search/string/ilike.string.search.input';
import { NonNullableAnyStringSearchInput } from '@common/dto/input/search/string/non-nullable-any.string.search.input';
import { NonNullableInStringSearchInput } from '@common/dto/input/search/string/non-nullable-in.string.search.input';
import { EqualStringSearchInput } from '@common/dto/input/search/string/equal.string.search.input';

@InputType()
@ArgsType()
export class NonNullableStringSearchInput {
  @Field(() => RegexStringSearchInput, {
    nullable: true,
  })
  regex!: Nullable<RegexStringSearchInput>;

  @Field(() => LikeStringSearchInput, {
    nullable: true,
  })
  like!: Nullable<LikeStringSearchInput>;

  @Field(() => EqualStringSearchInput, {
    nullable: true,
  })
  equal!: Nullable<EqualStringSearchInput>;

  @Field(() => IlikeStringSearchInput, {
    nullable: true,
  })
  ilike!: Nullable<IlikeStringSearchInput>;

  @Field(() => NonNullableAnyStringSearchInput, {
    nullable: true,
  })
  any!: Nullable<NonNullableAnyStringSearchInput>;

  @Field(() => NonNullableInStringSearchInput, {
    nullable: true,
  })
  in!: Nullable<NonNullableInStringSearchInput>;
}
