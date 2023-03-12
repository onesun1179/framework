import { Resolver } from '@nestjs/graphql';
import { RoleService } from '../role.service';
import { Role } from '../model/role';

@Resolver(() => [Role])
export class RolesResolver {
  constructor(private roleService: RoleService) {}
}
