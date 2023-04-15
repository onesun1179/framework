import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import {
  RoleEntity,
  RoleFrontComponentMapEntity,
  RoleGroupEntity,
  RoleRouteMapEntity,
} from '@modules/role/entity';
import {
  RoleFrontComponentMapResolver,
  RoleGroupResolver,
  RoleResolver,
  RolesResolver,
} from '@modules/role/resolver';
import { RoleController } from './role.controller';
import {
  RoleFrontComponentMapRepository,
  RoleGroupRepository,
  RoleRepository,
  RoleRouteMapRepository,
} from '@modules/role/repository';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { UserRepository } from '@modules/user/repository';
import { RouteRepository } from '@modules/route/repositories';

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
