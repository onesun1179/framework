import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { MenuByRoleOutput } from '@modules/menu/dto/output/menu-by-role.output';

@ObjectType()
export class MenuByRolesOutput extends PagingOutput(MenuByRoleOutput) {}
