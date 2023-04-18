import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from '@common/type';
import { MenuRoleMapEntitiesSearchInput } from '@modules/menu/dto/input/search/menu-role-map-entities.search.input';
import { MenuRoleMapEntitiesSortInput } from '@modules/menu/dto/input/sort/menu-role-map-entities.sort.input';

@InputType()
@ArgsType()
export class MenuRoleMapEntitiesInput {
  @Field(() => MenuRoleMapEntitiesSearchInput, {
    nullable: true,
  })
  @Type(() => MenuRoleMapEntitiesSearchInput)
  search?: Nullable<MenuRoleMapEntitiesSearchInput>;

  @Field(() => MenuRoleMapEntitiesSortInput, {
    nullable: true,
  })
  @Type(() => MenuRoleMapEntitiesSortInput)
  sort?: Nullable<MenuRoleMapEntitiesSortInput>;
}
