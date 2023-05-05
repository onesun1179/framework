import { ArgsType, InputType } from '@nestjs/graphql';
import { SearchType } from '@common/factory/search-type';
import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';

@InputType()
@ArgsType()
export class UsersSearchInput extends SearchType({
  id: NonNullableStringSearchInput,
  roleSeqNo: NonNullableNumberSearchInput,
}) {}
