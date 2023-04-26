import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class FrontComponentEntitiesSortInput extends SortType([
  'id',
  'name',
  'desc',
  'createdAt',
  'updatedAt',
]) {}
