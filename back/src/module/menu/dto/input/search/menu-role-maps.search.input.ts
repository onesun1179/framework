import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { MenusSearchInput } from '@modules/menu/dto/input/search/menus.search.input';
import { SearchType } from '@common/factory/search-type';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';
import { NullableNumberSearchInput } from '@common/dto/input/search/nullable-number.search.input';
import { Nullable } from '@common/type';
import { Type } from 'class-transformer';

@InputType()
@ArgsType()
export class MenuRoleMapsSearchInput extends SearchType({
  seqNo: NonNullableNumberSearchInput,
  roleSeqNo: NonNullableNumberSearchInput,
  menuSeqNo: NonNullableNumberSearchInput,
  orderNo: NonNullableNumberSearchInput,
  parentSeqNo: NullableNumberSearchInput,
}) {
  @Field(() => MenusSearchInput, {
    nullable: true,
  })
  @Type(() => MenusSearchInput)
  menu?: Nullable<MenusSearchInput>;
}
