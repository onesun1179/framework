import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';
import { SearchType } from '@common/factory/search-type';
import { Nullable } from '@common/type';
import { Type } from 'class-transformer';

@InputType()
@ArgsType()
export class CodesSearchInput extends SearchType({
  seqNo: NonNullableNumberSearchInput,
  name: NonNullableStringSearchInput,
}) {
  @Field(() => ParentCodesSearchInput, {
    nullable: true,
  })
  @Type(() => ParentCodesSearchInput)
  parent?: Nullable<ParentCodesSearchInput>;
}

@InputType()
@ArgsType()
class ParentCodesSearchInput {
  @Field(() => NonNullableNumberSearchInput, {
    nullable: true,
  })
  @Type(() => NonNullableNumberSearchInput)
  seqNo?: Nullable<NonNullableNumberSearchInput>;

  @Field(() => NonNullableStringSearchInput, {
    nullable: true,
  })
  @Type(() => NonNullableStringSearchInput)
  name?: Nullable<NonNullableStringSearchInput>;
}
