import { Resolver } from '@nestjs/graphql';
import { RoleService } from '../role.service';
import { RoleEntity } from '@modules/role/entity';

@Resolver(() => [RoleEntity])
export class RolesResolver {
  constructor(private roleService: RoleService) {}
}
