import { ArgsType, InputType } from '@nestjs/graphql';
import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';
import { SearchType } from '@common/factory/search-type';

@InputType()
@ArgsType()
export class CodesSearchInput extends SearchType({
  seqNo: NonNullableNumberSearchInput,
  name: NonNullableStringSearchInput,
}) {}
