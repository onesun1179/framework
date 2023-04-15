import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { RegexStringSearchInput } from '@common/dto/input/search/string/regex.string.search.input';
import { LikeStringSearchInput } from '@common/dto/input/search/string/like.string.search.input';
import { Nullable } from 'src/common/type';
import { IlikeStringSearchInput } from '@common/dto/input/search/string/ilike.string.search.input';
import { EqualStringSearchInput } from '@common/dto/input/search/string/equal.string.search.input';
import { NullableAnyStringSearchInput } from '@common/dto/input/search/string/nullable-any.string.search.input';
import { NullableInStringSearchInput } from '@common/dto/input/search/string/nullable-in.string.search.input';

@InputType()
@ArgsType()
export class NullableStringSearchInput {
  @Field(() => RegexStringSearchInput, {
    nullable: true,
    defaultValue: null,
  })
  regex!: Nullable<RegexStringSearchInput>;

  @Field(() => LikeStringSearchInput, {
    nullable: true,
    defaultValue: null,
  })
  like!: Nullable<LikeStringSearchInput>;

  @Field(() => EqualStringSearchInput, {
    nullable: true,
    defaultValue: null,
  })
  equal!: Nullable<EqualStringSearchInput>;

  @Field(() => IlikeStringSearchInput, {
    nullable: true,
    defaultValue: null,
  })
  ilike!: Nullable<IlikeStringSearchInput>;

  @Field(() => NullableAnyStringSearchInput, {
    nullable: true,
    defaultValue: null,
  })
  any!: Nullable<NullableAnyStringSearchInput>;

  @Field(() => NullableInStringSearchInput, {
    nullable: true,
    defaultValue: null,
  })
  in!: Nullable<NullableInStringSearchInput>;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: null,
  })
  isNull!: Nullable<boolean>;
}
