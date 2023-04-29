import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { MenuRoleMapOutput } from '@modules/menu/dto/output/entity/menu-role-map.output';

@ObjectType()
export class MenuRoleMapsOutput extends PagingOutput(MenuRoleMapOutput) {}
