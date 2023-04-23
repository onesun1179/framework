import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { RegexStringSearchInput } from '@common/dto/input/search/string/regex.string.search.input';
import { LikeStringSearchInput } from '@common/dto/input/search/string/like.string.search.input';
import { Nullable } from 'src/common/type';
import { IlikeStringSearchInput } from '@common/dto/input/search/string/ilike.string.search.input';
import { EqualStringSearchInput } from '@common/dto/input/search/string/equal.string.search.input';
import { NullableAnyStringSearchInput } from '@common/dto/input/search/string/nullable-any.string.search.input';
import { NullableInStringSearchInput } from '@common/dto/input/search/string/nullable-in.string.search.input';
import { IsNullStringSearchInput } from '@common/dto/input/search/string/is-null.string.search.input';

@InputType()
@ArgsType()
export class NullableStringSearchInput {
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

  @Field(() => NullableAnyStringSearchInput, {
    nullable: true,
  })
  any!: Nullable<NullableAnyStringSearchInput>;

  @Field(() => NullableInStringSearchInput, {
    nullable: true,
  })
  in!: Nullable<NullableInStringSearchInput>;

  @Field(() => IsNullStringSearchInput, {
    nullable: true,
  })
  isNull!: Nullable<IsNullStringSearchInput>;
}
