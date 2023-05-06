import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { NullableNumberSearchInput } from '@common/dto/input/search/nullable-number.search.input';
import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';
import { SearchType } from '@common/factory/search-type';
import { Nullable } from '@common/type';
import { Type } from 'class-transformer';

@InputType()
@ArgsType()
export class MenusSearchInput extends SearchType({
  seqNo: NonNullableNumberSearchInput,
  name: NonNullableStringSearchInput,
  iconSeqNo: NullableNumberSearchInput,
  routeSeqNo: NullableNumberSearchInput,
}) {
  @Field(() => RoleSearchInput, {
    nullable: true,
  })
  @Type(() => RoleSearchInput)
  role?: Nullable<RoleSearchInput>;
}

@InputType()
@ArgsType()
class RoleSearchInput extends SearchType({
  parentSeqNo: NullableNumberSearchInput,
  orderNo: NonNullableNumberSearchInput,
  roleSeqNo: NonNullableNumberSearchInput,
}) {}
