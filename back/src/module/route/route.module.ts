import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RouteService } from '@modules/route/route.service';
import { RouteEntity } from '@modules/route/entity/route.entity';
import { RoleRouteMapEntity } from '@modules/role/entity/role-route-map.entity';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { RoleRouteMapRepository } from '@modules/role/repository/role-route-map.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { RouteResolver } from '@modules/route/resolvers/route.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([RouteEntity, RoleRouteMapEntity]),
    TypeOrmExModule.forCustomRepository([
      RouteRepository,
      RoleRouteMapRepository,
      RoleRepository,
    ]),
  ],
  providers: [RouteResolver, RouteService],
  exports: [RouteService],
})
export class RouteModule {}
