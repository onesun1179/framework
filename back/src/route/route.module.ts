import { Module } from '@nestjs/common';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './model/Route';
import { FullRoutesAuths } from './model/FullRoutesAuths';
import { RouteResolver } from './resolvers/route.resolver';
import { FullRoute } from './model/FullRoute';
import { RoutesResolver } from './resolvers/routes.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Route, FullRoutesAuths, FullRoute])],
  controllers: [RouteController],
  providers: [RouteService, RouteResolver, RoutesResolver],
  exports: [RouteService],
})
export class RouteModule {}
