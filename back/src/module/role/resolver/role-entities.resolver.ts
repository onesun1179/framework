import { Resolver } from '@nestjs/graphql';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { RoleService } from '@modules/role/role.service';

@Resolver(() => [RoleEntity])
export class RoleEntitiesResolver {
  constructor(private roleService: RoleService) {}
}
