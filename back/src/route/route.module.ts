import { Module } from '@nestjs/common';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './models/Route';
import { RoutesAuths } from './models/RoutesAuths';
import { RouteResolver } from './resolvers/route.resolver';
import { RoutesResolver } from './resolvers/routes.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Route, RoutesAuths])],
  controllers: [RouteController],
  providers: [RouteService, RouteResolver, RoutesResolver],
  exports: [RouteService],
})
export class RouteModule {}
