import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class FrontComponentsSortInput extends SortType([
  'id',
  'name',
  'desc',
  'createdAt',
  'updatedAt',
]) {}
