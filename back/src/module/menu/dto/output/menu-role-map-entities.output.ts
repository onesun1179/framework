import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { MenuRoleMapEntity } from '@modules/menu/dto/output/entity/menu-role-map.entity';

@ObjectType()
export class MenuRoleMapEntitiesOutput extends PagingOutput(
  MenuRoleMapEntity,
) {}
