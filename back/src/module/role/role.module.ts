import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { UserRepository } from '@modules/user/repository/user.repository';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { RoleGroupRepository } from '@modules/role/repository/role-group.repository';
import { RoleRouteMapRepository } from '@modules/role/repository/role-route-map.repository';
import { RoleFrontComponentMapRepository } from '@modules/role/repository/role-front-component-map.repository';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { RoleGroupOutput } from '@modules/role/dto/output/entity/role-group.output';
import { RoleFrontComponentMapOutput } from '@modules/role/dto/output/entity/role-front-component-map.output';
import { RoleRouteMapOutput } from '@modules/role/dto/output/entity/role-route-map.output';
import { RoleService } from '@modules/role/role.service';
import { RoleController } from '@modules/role/role.controller';
import { RoleResolver } from '@modules/role/resolver/role.resolver';
import { RoleGroupResolver } from '@modules/role/resolver/role-group.resolver';
import { RoleFrontComponentMapResolver } from '@modules/role/resolver/role-front-component-map.resolver';
import { FrontComponentRepository } from '@modules/front-component/repository/front-component.repository';
import { AllFrontComponentRepository } from '@modules/front-component/repository/all-front-component.repository';

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
      FrontComponentRepository,
      AllFrontComponentRepository,
    ]),
    TypeOrmModule.forFeature([
      RoleOutput,
      RoleGroupOutput,
      RoleFrontComponentMapOutput,
      RoleRouteMapOutput,
    ]),
  ],
  exports: [RoleService],
  controllers: [RoleController],
  providers: [
    RoleService,
    RoleResolver,
    RoleGroupResolver,
    RoleFrontComponentMapResolver,
  ],
})
export class RoleModule {}
