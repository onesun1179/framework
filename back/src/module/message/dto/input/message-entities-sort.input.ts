import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class MessageEntitiesSortInput extends SortType([
  'seqNo',
  'code',
  'name',
  'text',
  'groupCode',
  'desc',
  'createdAt',
  'updatedAt',
]) {}
