import { ArgsType, InputType } from '@nestjs/graphql';
import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import { SearchType } from '@common/factory/search-type';

@InputType()
@ArgsType()
export class FrontComponentEntitiesSearchInput extends SearchType({
  id: NonNullableStringSearchInput,
  name: NonNullableStringSearchInput,
}) {}
