import { ArgsType, InputType } from '@nestjs/graphql';
import { SortType } from '@common/factory/sort-type';

@InputType()
@ArgsType()
export class IconsSortInput extends SortType(['seqNo', 'name', 'filePath']) {}
