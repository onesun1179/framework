import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { UserEntityRepository } from '@modules/user/repository/user-entity.repository';
import { RouteEntityRepository } from '@modules/route/repository/route-entity.repository';
import { RoleEntityRepository } from '@modules/role/repository/role-entity.repository';
import { RoleGroupEntityRepository } from '@modules/role/repository/role-group-entity.repository';
import { RoleRouteMapEntityRepository } from '@modules/role/repository/role-route-map-entity.repository';
import { RoleFrontComponentMapEntityRepository } from '@modules/role/repository/role-front-component-map-entity.repository';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { RoleGroupEntity } from '@modules/role/dto/output/entity/role-group.entity';
import { RoleFrontComponentMapEntity } from '@modules/role/dto/output/entity/role-front-component-map.entity';
import { RoleRouteMapEntity } from '@modules/role/dto/output/entity/role-route-map.entity';
import { RoleService } from '@modules/role/role.service';
import { RoleController } from '@modules/role/role.controller';
import { RoleEntityResolver } from '@modules/role/resolver/role-entity.resolver';
import { RoleGroupEntityResolver } from '@modules/role/resolver/role-group-entity.resolver';
import { RoleFrontComponentMapEntityResolver } from '@modules/role/resolver/role-front-component-map-entity.resolver';

@Global()
@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      UserEntityRepository,
      RoleEntityRepository,
      RouteEntityRepository,
      RoleGroupEntityRepository,
      RoleRouteMapEntityRepository,
      RoleFrontComponentMapEntityRepository,
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
    RoleEntityResolver,
    RoleGroupEntityResolver,
    RoleFrontComponentMapEntityResolver,
  ],
})
export class RoleModule {}
