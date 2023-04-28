import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import { SearchType } from '@common/factory/search-type';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';
import { Nullable } from '@common/type';
import { IconLabelsSearchInput } from '@modules/icon/dto/input/search/icon-labels.search.input';
import { Type } from 'class-transformer';

@InputType()
@ArgsType()
export class IconsSearchInput extends SearchType({
  seqNo: NonNullableNumberSearchInput,
  name: NonNullableStringSearchInput,
  filePath: NonNullableStringSearchInput,
}) {
  @Field(() => IconLabelsSearchInput, {
    nullable: true,
  })
  @Type(() => IconLabelsSearchInput)
  iconLabel?: Nullable<IconLabelsSearchInput>;
}
