import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { MenuEntitiesSortInput } from '@modules/menu/dto/input/sort/menu-entities.sort.input';
import { Type } from 'class-transformer';
import { Nullable } from '@common/type';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class MenuRoleMapEntitiesSortInput extends SortType([
  'seqNo',
  'menuSeqNo',
  'roleSeqNo',
]) {
  @Field(() => MenuEntitiesSortInput, {
    nullable: true,
  })
  @Type(() => MenuEntitiesSortInput)
  menu?: Nullable<MenuEntitiesSortInput>;
}
