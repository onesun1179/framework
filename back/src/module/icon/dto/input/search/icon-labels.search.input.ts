import { ArgsType, InputType } from '@nestjs/graphql';
import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import { SearchType } from '@common/factory/search-type';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';

@InputType()
@ArgsType()
export class IconLabelsSearchInput extends SearchType({
  seqNo: NonNullableNumberSearchInput,
  name: NonNullableStringSearchInput,
}) {}
