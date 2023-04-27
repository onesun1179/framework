import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from '@common/type';
import { MenuRoleMapsSearchInput } from '@modules/menu/dto/input/search/menu-role-maps.search.input';
import { MenuRoleMapsSortInput } from '@modules/menu/dto/input/sort/menu-role-maps.sort.input';

@InputType()
@ArgsType()
export class MenuRoleMapsInput {
  @Field(() => MenuRoleMapsSearchInput, {
    nullable: true,
  })
  @Type(() => MenuRoleMapsSearchInput)
  search?: Nullable<MenuRoleMapsSearchInput>;

  @Field(() => MenuRoleMapsSortInput, {
    nullable: true,
  })
  @Type(() => MenuRoleMapsSortInput)
  sort?: Nullable<MenuRoleMapsSortInput>;
}
