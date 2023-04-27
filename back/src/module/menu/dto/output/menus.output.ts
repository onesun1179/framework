import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';

@ObjectType(`MenusOutput`)
export class MenusOutput extends PagingOutput(MenuOutput) {}
