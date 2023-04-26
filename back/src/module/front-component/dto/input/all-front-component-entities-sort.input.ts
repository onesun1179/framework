import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class AllFrontComponentEntitiesSortInput extends SortType([
  'id',
  'frontComponentId',
  'desc',
  'createdAt',
  'updatedAt',
]) {}
