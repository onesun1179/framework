import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class MenusSortInput extends SortType([
  'seqNo',
  'name',
  'iconSeqNo',
  'path',
  'frontComponentId',
  'createdAt',
  'updatedAt',
  'desc',
]) {}
