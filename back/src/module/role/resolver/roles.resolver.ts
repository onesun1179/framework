import { Resolver } from '@nestjs/graphql';
import { RoleEntity } from '@modules/role/entity/role.entity';
import { RoleService } from '@modules/role/role.service';

@Resolver(() => [RoleEntity])
export class RolesResolver {
  constructor(private roleService: RoleService) {}
}
