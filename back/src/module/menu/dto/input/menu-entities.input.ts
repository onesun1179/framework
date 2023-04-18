import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from '@common/type';
import { MenuEntitiesSearchInput } from '@modules/menu/dto/input/search/menu-entities.search.input';
import { MenuEntitiesSortInput } from '@modules/menu/dto/input/sort/menu-entities.sort.input';

@InputType()
@ArgsType()
export class MenuEntitiesInput {
  @Field(() => MenuEntitiesSearchInput, {
    nullable: true,
  })
  @Type(() => MenuEntitiesSearchInput)
  search?: Nullable<MenuEntitiesSearchInput>;

  @Field(() => MenuEntitiesSortInput, {
    nullable: true,
  })
  @Type(() => MenuEntitiesSortInput)
  sort?: Nullable<MenuEntitiesSortInput>;
}
