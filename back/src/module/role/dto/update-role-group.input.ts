import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { RoleGroupEntity } from '@modules/role/entity/role-group.entity';
import { InsertRoleGroupInput } from '@modules/role/dto/insert-role-group.input';

@InputType()
@ArgsType()
export class UpdateRoleGroupInput extends IntersectionType(
  PickType(RoleGroupEntity, ['seqNo']),
  PartialType(InsertRoleGroupInput),
) {}
