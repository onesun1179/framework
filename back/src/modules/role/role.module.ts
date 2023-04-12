import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { RoleResolver } from './resolvers/role.resolver';
import { RoleController } from './role.controller';
import { RoleGroup } from './entities/role-group.entity';
import { RolesResolver } from './resolvers/roles.resolver';
import { RoleGroupResolver } from './resolvers/role-group.resolver';
import { RoleFrontComponentMapResolver } from '@modules/role/resolvers/role-front-component-map.resolver';
import { RoleFrontComponentMap } from '@modules/role/entities/role-front-component-map.entity';
import { RoleRouteMap } from '@modules/role/entities/role-route-map.entity';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { TypeOrmExModule } from '@common/modules/TypeOrmExModule';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { RouteRepository } from '@modules/route/repositories/route.repository';
import { RoleGroupRepository } from '@modules/role/repositories/role-group.repository';
import { RoleRouteMapRepository } from '@modules/role/repositories/role-route-map.repository';
import { RoleFrontComponentMapRepository } from '@modules/role/repositories/role-front-component-map.repository';

@Global()
@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      UserRepository,
      RoleRepository,
      RouteRepository,
      RoleGroupRepository,
      RoleRouteMapRepository,
      RoleFrontComponentMapRepository,
    ]),
    TypeOrmModule.forFeature([
      Role,
      RoleGroup,
      RoleFrontComponentMap,
      RoleRouteMap,
    ]),
  ],
  exports: [RoleService],
  controllers: [RoleController],
  providers: [
    RoleService,
    RoleResolver,
    RolesResolver,
    RoleGroupResolver,
    RoleFrontComponentMapResolver,
  ],
})
export class RoleModule {}
