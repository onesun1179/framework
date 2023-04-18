import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RouteService } from '@modules/route/route.service';
import { RouteEntity } from '@modules/route/dto/output/entity/route.entity';
import { RoleRouteMapEntity } from '@modules/role/dto/output/entity/role-route-map.entity';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { RouteEntityRepository } from '@modules/route/repository/route-entity.repository';
import { RoleRouteMapEntityRepository } from '@modules/role/repository/role-route-map-entity.repository';
import { RoleEntityRepository } from '@modules/role/repository/role-entity.repository';
import { RouteResolver } from '@modules/route/resolvers/route.resolver';
import { RouteEntityResolver } from '@modules/route/resolvers/route-entity.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([RouteEntity, RoleRouteMapEntity]),
    TypeOrmExModule.forCustomRepository([
      RouteEntityRepository,
      RoleRouteMapEntityRepository,
      RoleEntityRepository,
    ]),
  ],
  providers: [RouteResolver, RouteService, RouteEntityResolver],
  exports: [RouteService],
})
export class RouteModule {}
