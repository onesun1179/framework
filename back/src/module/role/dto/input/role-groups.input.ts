import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';
import { RoleGroupsSearchInput } from '@modules/role/dto/input/role-groups-search.input';
import { RoleGroupsSortInput } from '@modules/role/dto/input/role-groups-sort.input';

@InputType()
@ArgsType()
export class RoleGroupsInput {
  @Field(() => RoleGroupsSearchInput, {
    nullable: true,
  })
  @Type(() => RoleGroupsSearchInput)
  search?: Nullable<RoleGroupsSearchInput>;

  @Field(() => RoleGroupsSortInput, {
    nullable: true,
  })
  @Type(() => RoleGroupsSortInput)
  sort?: Nullable<RoleGroupsSortInput>;
}
