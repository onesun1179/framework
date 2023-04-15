import { Resolver } from '@nestjs/graphql';
import { RoleService } from '@modules/role';
import { RoleEntity } from '@modules/role/entity';

@Resolver(() => [RoleEntity])
export class RolesResolver {
  constructor(private roleService: RoleService) {}
}
