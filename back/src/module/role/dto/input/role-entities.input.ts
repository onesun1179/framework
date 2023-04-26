import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';
import { RoleEntitiesSearchInput } from '@modules/role/dto/input/role-entities-search.input';
import { RoleEntitiesSortInput } from '@modules/role/dto/input/role-entities-sort.input';

@InputType()
@ArgsType()
export class RoleEntitiesInput {
  @Field(() => RoleEntitiesSearchInput, {
    nullable: true,
  })
  @Type(() => RoleEntitiesSearchInput)
  search?: Nullable<RoleEntitiesSearchInput>;

  @Field(() => RoleEntitiesSortInput, {
    nullable: true,
  })
  @Type(() => RoleEntitiesSortInput)
  sort?: Nullable<RoleEntitiesSortInput>;
}
