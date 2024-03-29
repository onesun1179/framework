import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class UsersSortInput extends SortType(['id', 'roleSeqNo']) {}
