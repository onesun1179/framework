import { ObjectType } from '@nestjs/graphql';
import { Menu } from '@modules/menu/model/menu';
import { PagingOutput } from '@common/dto/paging.output';

@ObjectType('GqlMenus')
export class Menus extends PagingOutput(Menu) {}
