import { ObjectType } from '@nestjs/graphql';
import { MenuEntity } from '@modules/menu/entity';
import { PagingOutput } from '@common/dto/output/paging.output';

@ObjectType()
export class MenusOutput extends PagingOutput(MenuEntity) {}
