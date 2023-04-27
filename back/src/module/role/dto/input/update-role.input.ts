import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { InsertRoleInput } from '@modules/role/dto/input/insert-role.input';

@InputType()
export class UpdateRoleInput extends IntersectionType(
  PickType(RoleOutput, ['seqNo']),
  PickType(PartialType(InsertRoleInput), [
    'name',
    'roleGroupSeqNo',
    'userIds',
    'menuSeqNos',
    'routeSeqNos',
  ]),
) {}
