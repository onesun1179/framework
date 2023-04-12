import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { InsertRoleInput } from '@modules/role/dto/insert-role.input';
import { Role } from '@modules/role/entities/role.entity';

@InputType()
export class UpdateRoleInput extends IntersectionType(
  PickType(Role, ['seqNo']),
  PickType(PartialType(InsertRoleInput), [
    'name',
    'roleGroupSeqNo',
    'userIds',
    'menuSeqNos',
    'routeSeqNos',
  ]),
) {}
