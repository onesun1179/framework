import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { Role } from './model/role';
import { RoleResolver } from './resolvers/role.resolver';
import { UserModule } from '../user/user.module';
import { RoleController } from './role.controller';
import { RoleGroup } from './model/role-group';
import { RolesResolver } from './resolvers/roles.resolver';
import { RoleGroupResolver } from './resolvers/role-group.resolver';
import { RoleFrontComponentMapResolver } from '@modules/role/resolvers/role-front-component-map.resolver';
import { RoleFrontComponentMap } from '@modules/role/model/role-front-component-map';
import { RoleRouteMap } from '@modules/role/model/role-route-map';

@Global()
@Module({
  imports: [
    UserModule,
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
