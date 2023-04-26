import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';
import { RoleGroupEntitiesSearchInput } from '@modules/role/dto/input/role-group-entities-search.input';
import { RoleGroupEntitiesSortInput } from '@modules/role/dto/input/role-group-entities-sort.input';

@InputType()
@ArgsType()
export class RoleGroupEntitiesInput {
  @Field(() => RoleGroupEntitiesSearchInput, {
    nullable: true,
  })
  @Type(() => RoleGroupEntitiesSearchInput)
  search?: Nullable<RoleGroupEntitiesSearchInput>;

  @Field(() => RoleGroupEntitiesSortInput, {
    nullable: true,
  })
  @Type(() => RoleGroupEntitiesSortInput)
  sort?: Nullable<RoleGroupEntitiesSortInput>;
}
