import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { RoleGroup } from '../entities/role-group.entity';
import { InsertRoleGroupInput } from '@modules/role/dto/insert-role-group.input';

@InputType()
@ArgsType()
export class UpdateRoleGroupInput extends IntersectionType(
  PickType(RoleGroup, ['seqNo']),
  PartialType(InsertRoleGroupInput),
) {}
