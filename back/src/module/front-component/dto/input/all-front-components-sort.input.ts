import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class AllFrontComponentsSortInput extends SortType([
  'id',
  'frontComponentId',
  'desc',
  'createdAt',
  'updatedAt',
]) {}
