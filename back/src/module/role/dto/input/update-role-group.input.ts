import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { RoleGroupOutput } from '@modules/role/dto/output/entity/role-group.output';
import { InsertRoleGroupInput } from '@modules/role/dto/input/insert-role-group.input';

@InputType()
@ArgsType()
export class UpdateRoleGroupInput extends IntersectionType(
  PickType(RoleGroupOutput, ['seqNo']),
  PartialType(InsertRoleGroupInput),
) {}
