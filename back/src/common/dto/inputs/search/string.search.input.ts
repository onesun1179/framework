import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { RegexStringSearchInput } from '@common/dto/inputs/search/string/regex.string.search.input';
import { LikeStringSearchInput } from '@common/dto/inputs/search/string/like.string.search.input';
import { Nullable } from '@common/types';
import { IlikeStringSearchInput } from '@common/dto/inputs/search/string/ilike.string.search.input';
import { AnyStringSearchInput } from '@common/dto/inputs/search/string/any.string.search.input';
import { InStringSearchInput } from '@common/dto/inputs/search/string/in.string.search.input';
import { EqualStringSearchInput } from '@common/dto/inputs/search/string/equal.string.search.input';

@InputType()
@ArgsType()
export class StringSearchInput {
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

  @Field(() => AnyStringSearchInput, {
    nullable: true,
    defaultValue: null,
  })
  any!: Nullable<AnyStringSearchInput>;

  @Field(() => InStringSearchInput, {
    nullable: true,
    defaultValue: null,
  })
  in!: Nullable<InStringSearchInput>;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: null,
  })
  isNull!: Nullable<boolean>;
}
