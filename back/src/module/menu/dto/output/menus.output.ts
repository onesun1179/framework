import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';

@ObjectType()
export class MenusOutput extends PagingOutput(MenuEntity) {}
