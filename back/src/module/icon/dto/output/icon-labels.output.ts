import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { IconLabelOutput } from '@modules/icon/dto/output/entity/icon-label.output';

@ObjectType()
export class IconLabelsOutput extends PagingOutput(IconLabelOutput) {}
