import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { RoleEntity } from '@modules/role/entity/role.entity';
import { InsertRoleInput } from '@modules/role/dto/insert-role.input';

@InputType()
export class UpdateRoleInput extends IntersectionType(
  PickType(RoleEntity, ['seqNo']),
  PickType(PartialType(InsertRoleInput), [
    'name',
    'roleGroupSeqNo',
    'userIds',
    'menuSeqNos',
    'routeSeqNos',
  ]),
) {}
