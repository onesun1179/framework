import { ObjectType } from '@nestjs/graphql';
import { Menu } from '@modules/menu/model/menu';
import { PagingResponse } from '../../../../paging/models/paging.response';

@ObjectType()
export class Menus extends PagingResponse(Menu) {}
