import { ArgsType, InputType } from '@nestjs/graphql';
import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';
import { SearchType } from '@common/factory/search-type';
import { NullableStringSearchInput } from '@common/dto/input/search/nullable-string.search.input';

@InputType()
@ArgsType()
export class RolesSearchInput extends SearchType({
  seqNo: NonNullableNumberSearchInput,
  name: NonNullableStringSearchInput,
  identifier: NullableStringSearchInput,
}) {}
