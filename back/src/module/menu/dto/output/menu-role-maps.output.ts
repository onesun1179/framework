import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { MenuRoleMapEntity } from '@modules/menu/entity/menu-role-map.entity';

@ObjectType()
export class MenuRoleMapsOutput extends PagingOutput(MenuRoleMapEntity) {}
