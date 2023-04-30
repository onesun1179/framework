import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class RolesSortInput extends SortType([
  'seqNo',
  'name',
  'identifier',
  'desc',
  'createdAt',
  'updatedAt',
]) {}
