import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { RoleGroupEntity } from '@modules/role/dto/output/entity/role-group.entity';
import { InsertRoleGroupEntityInput } from '@modules/role/dto/input/insert-role-group-entity.input';

@InputType()
@ArgsType()
export class UpdateRoleGroupEntityInput extends IntersectionType(
  PickType(RoleGroupEntity, ['seqNo']),
  PartialType(InsertRoleGroupEntityInput),
) {}
