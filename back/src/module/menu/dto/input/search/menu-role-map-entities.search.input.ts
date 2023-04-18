import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { MenuEntitiesSearchInput } from '@modules/menu/dto/input/search/menu-entities.search.input';
import { SearchType } from '@common/factory/search-type';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';
import { NullableNumberSearchInput } from '@common/dto/input/search/nullable-number.search.input';
import { Nullable } from '@common/type';
import { Type } from 'class-transformer';

@InputType()
@ArgsType()
export class MenuRoleMapEntitiesSearchInput extends SearchType({
  seqNo: NonNullableNumberSearchInput,
  roleSeqNo: NonNullableNumberSearchInput,
  menuSeqNo: NonNullableNumberSearchInput,
  orderNo: NonNullableNumberSearchInput,
  parentSeqNo: NullableNumberSearchInput,
}) {
  @Field(() => MenuEntitiesSearchInput, {
    nullable: true,
  })
  @Type(() => MenuEntitiesSearchInput)
  menu?: Nullable<MenuEntitiesSearchInput>;
}
