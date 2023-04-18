import { ArgsType, InputType } from '@nestjs/graphql';
import { NullableNumberSearchInput } from '@common/dto/input/search/nullable-number.search.input';
import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import { SearchType } from '@common/factory/search-type';

@InputType()
@ArgsType()
export class RouteEntitiesSearchInput extends SearchType({
  path: NonNullableStringSearchInput,
  frontComponentId: NonNullableStringSearchInput,
  parentSeqNo: NullableNumberSearchInput,
}) {}
