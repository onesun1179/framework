import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';
import { RolesSearchInput } from '@modules/role/dto/input/search/roles.search.input';
import { RolesSortInput } from '@modules/role/dto/input/sort/roles.sort.input';

@InputType()
@ArgsType()
export class RolesInput {
  @Field(() => RolesSearchInput, {
    nullable: true,
  })
  @Type(() => RolesSearchInput)
  search?: Nullable<RolesSearchInput>;

  @Field(() => RolesSortInput, {
    nullable: true,
  })
  @Type(() => RolesSortInput)
  sort?: Nullable<RolesSortInput>;
}
