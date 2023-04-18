import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class MenuEntitiesSortInput extends SortType(['seqNo']) {}
