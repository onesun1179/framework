import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { IconOutput } from '@modules/icon/dto/output/entity/icon.output';

@ObjectType()
export class IconsOutput extends PagingOutput(IconOutput) {}
