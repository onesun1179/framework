import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class CodesSortInput extends SortType(['seqNo', 'name']) {}
