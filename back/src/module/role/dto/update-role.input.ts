import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { InsertRoleInput } from '@modules/role/dto';
import { RoleEntity } from '@modules/role/entity';

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
