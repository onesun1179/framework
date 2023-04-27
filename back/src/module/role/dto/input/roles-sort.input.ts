import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class RolesSortInput extends SortType([
  'seqNo',
  'name',
  'identifier',
  'roleGroupSeqNo',
  'desc',
  'createdAt',
  'updatedAt',
]) {}
