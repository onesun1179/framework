import { Module } from '@nestjs/common';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './models/route';

import { RouteResolver } from './resolvers/route.resolver';
import { RoutesResolver } from './resolvers/routes.resolver';
import { RoleRouteMap } from '@modules/role/model/role-route-map';
import { RouteRouteMap } from '@modules/route/models/route-route-map';

@Module({
  imports: [TypeOrmModule.forFeature([Route, RoleRouteMap, RouteRouteMap])],
  controllers: [RouteController],
  providers: [RouteService, RouteResolver, RoutesResolver],
  exports: [RouteService],
})
export class RouteModule {}
