import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from '@modules/route/dto/route';

import { RouteResolver } from './resolvers/route.resolver';
import { RoleRouteMap } from '@modules/role/entities/role-route-map.entity';
import { TypeOrmExModule } from '@common/modules/TypeOrmExModule';
import { RouteRepository } from '@modules/route/repositories/route.repository';
import { RoleRouteMapRepository } from '@modules/role/repositories/role-route-map.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Route, RoleRouteMap]),
    TypeOrmExModule.forCustomRepository([
      RouteRepository,
      RoleRouteMapRepository,
    ]),
  ],
  providers: [RouteService, RouteResolver],
  exports: [RouteService],
})
export class RouteModule {}
