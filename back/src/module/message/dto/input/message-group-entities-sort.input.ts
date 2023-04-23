import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class MessageGroupEntitiesSortInput extends SortType([
  'code',
  'name',
  'desc',
  'createdAt',
  'updatedAt',
]) {}
