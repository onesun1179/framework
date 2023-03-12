import { Resolver } from '@nestjs/graphql';
import { RoleService } from '../role.service';
import { Role } from '../model/Role';

@Resolver(() => [Role])
export class RolesResolver {
  constructor(private roleService: RoleService) {}
}
