import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { RoleGroupEntity } from '@modules/role/entity';
import { InsertRoleGroupInput } from '@modules/role/dto';

@InputType()
@ArgsType()
export class UpdateRoleGroupInput extends IntersectionType(
  PickType(RoleGroupEntity, ['seqNo']),
  PartialType(InsertRoleGroupInput),
) {}
