import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { UserRepository } from '@modules/user/repository/user.repository';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { RoleGroupRepository } from '@modules/role/repository/role-group.repository';
import { RoleRouteMapRepository } from '@modules/role/repository/role-route-map.repository';
import { RoleFrontComponentMapRepository } from '@modules/role/repository/role-front-component-map.repository';
import { RoleEntity } from '@modules/role/entity/role.entity';
import { RoleGroupEntity } from '@modules/role/entity/role-group.entity';
import { RoleFrontComponentMapEntity } from '@modules/role/entity/role-front-component-map.entity';
import { RoleRouteMapEntity } from '@modules/role/entity/role-route-map.entity';
import { RoleService } from '@modules/role/role.service';
import { RoleController } from '@modules/role/role.controller';
import { RoleResolver } from '@modules/role/resolver/role.resolver';
import { RolesResolver } from '@modules/role/resolver/roles.resolver';
import { RoleGroupResolver } from '@modules/role/resolver/role-group.resolver';
import { RoleFrontComponentMapResolver } from '@modules/role/resolver/role-front-component-map.resolver';

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
      RoleEntity,
      RoleGroupEntity,
      RoleFrontComponentMapEntity,
      RoleRouteMapEntity,
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
