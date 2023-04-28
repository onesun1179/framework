import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';
import { IconsSearchInput } from '@modules/icon/dto/input/search/icons.search.input';
import { IconsSortInput } from '@modules/icon/dto/input/sort/icons.sort.input';

@InputType()
@ArgsType()
export class IconsInput {
  @Field(() => IconsSearchInput, {
    nullable: true,
  })
  @Type(() => IconsSearchInput)
  search?: Nullable<IconsSearchInput>;

  @Field(() => IconsSortInput, {
    nullable: true,
  })
  @Type(() => IconsSortInput)
  sort?: Nullable<IconsSortInput>;
}
