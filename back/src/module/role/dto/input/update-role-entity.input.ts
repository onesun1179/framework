import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { InsertRoleEntityInput } from '@modules/role/dto/input/insert-role-entity.input';

@InputType()
export class UpdateRoleEntityInput extends IntersectionType(
  PickType(RoleEntity, ['seqNo']),
  PickType(PartialType(InsertRoleEntityInput), [
    'name',
    'roleGroupSeqNo',
    'userIds',
    'menuSeqNos',
    'routeSeqNos',
  ]),
) {}
