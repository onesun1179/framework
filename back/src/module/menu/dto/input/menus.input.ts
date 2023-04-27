import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from '@common/type';
import { MenusSearchInput } from '@modules/menu/dto/input/search/menus.search.input';
import { MenusSortInput } from '@modules/menu/dto/input/sort/menus.sort.input';

@InputType()
@ArgsType()
export class MenusInput {
  @Field(() => MenusSearchInput, {
    nullable: true,
  })
  @Type(() => MenusSearchInput)
  search?: Nullable<MenusSearchInput>;

  @Field(() => MenusSortInput, {
    nullable: true,
  })
  @Type(() => MenusSortInput)
  sort?: Nullable<MenusSortInput>;
}
