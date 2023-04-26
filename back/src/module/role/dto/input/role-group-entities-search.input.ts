import { ArgsType, InputType } from '@nestjs/graphql';
import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';
import { SearchType } from '@common/factory/search-type';
import { NullableNumberSearchInput } from '@common/dto/input/search/nullable-number.search.input';

@InputType()
@ArgsType()
export class RoleGroupEntitiesSearchInput extends SearchType({
  seqNo: NonNullableNumberSearchInput,
  name: NonNullableStringSearchInput,
  parentSeqNo: NullableNumberSearchInput,
}) {}
