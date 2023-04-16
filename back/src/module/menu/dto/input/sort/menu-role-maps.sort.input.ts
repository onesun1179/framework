import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { MenusSortInput } from '@modules/menu/dto/input/sort/menus.sort.input';
import { Type } from 'class-transformer';
import { Nullable } from '@common/type';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class MenuRoleMapsSortInput extends SortType([
  'seqNo',
  'menuSeqNo',
  'roleSeqNo',
]) {
  @Field(() => MenusSortInput, {
    nullable: true,
  })
  @Type(() => MenusSortInput)
  menu?: Nullable<MenusSortInput>;
}
