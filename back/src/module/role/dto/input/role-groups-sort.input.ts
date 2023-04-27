import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class RoleGroupsSortInput extends SortType([
  'seqNo',
  'name',
  'parentSeqNo',
  'desc',
  'createdAt',
  'updatedAt',
]) {}
