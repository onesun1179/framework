import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class IconLabelsSortInput extends SortType(['seqNo', 'name']) {}
