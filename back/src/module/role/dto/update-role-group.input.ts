import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { RoleGroupEntity } from '@modules/role/entity';
import { InsertRoleGroupInput } from '../../role/dto/insert-role-group.input';

@InputType()
@ArgsType()
export class UpdateRoleGroupInput extends IntersectionType(
  PickType(RoleGroupEntity, ['seqNo']),
  PartialType(InsertRoleGroupInput),
) {}
