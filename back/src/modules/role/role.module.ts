import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { Role } from './model/Role';
import { RoleResolver } from './resolvers/role.resolver';
import { UserModule } from '../user/user.module';
import { RoleController } from './role.controller';
import { RoleGroup } from './model/RoleGroup';
import { RolesResolver } from './resolvers/roles.resolver';
import { RoleGroupResolver } from './resolvers/roleGroup.resolver';

@Global()
@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Role, RoleGroup])],
  exports: [RoleService],
  controllers: [RoleController],
  providers: [RoleService, RoleResolver, RolesResolver, RoleGroupResolver],
})
export class RoleModule {}
