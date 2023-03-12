import { Module } from '@nestjs/common';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './models/Route';

import { RouteResolver } from './resolvers/route.resolver';
import { RoutesResolver } from './resolvers/routes.resolver';
import { RoleRouteMap } from '../role/model/RoleRouteMap';
import { RouteRouteMap } from '@modules/route/models/RouteRouteMap';

@Module({
  imports: [TypeOrmModule.forFeature([Route, RoleRouteMap, RouteRouteMap])],
  controllers: [RouteController],
  providers: [RouteService, RouteResolver, RoutesResolver],
  exports: [RouteService],
})
export class RouteModule {}
