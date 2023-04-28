import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';
import { IconLabelsSearchInput } from '@modules/icon/dto/input/search/icon-labels.search.input';
import { IconLabelsSortInput } from '@modules/icon/dto/input/sort/icon-labels.sort.input';

@InputType()
@ArgsType()
export class IconLabelsInput {
  @Field(() => IconLabelsSearchInput, {
    nullable: true,
  })
  @Type(() => IconLabelsSearchInput)
  search?: Nullable<IconLabelsSearchInput>;

  @Field(() => IconLabelsSortInput, {
    nullable: true,
  })
  @Type(() => IconLabelsSortInput)
  sort?: Nullable<IconLabelsSortInput>;
}
