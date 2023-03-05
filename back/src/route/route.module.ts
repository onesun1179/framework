import { Module } from '@nestjs/common';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './model/Route';
import { RoutesAuths } from './model/RoutesAuths';
import { RouteResolver } from './route.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Route, RoutesAuths])],
  controllers: [RouteController],
  providers: [RouteService, RouteResolver],
  exports: [RouteService],
})
export class RouteModule {}
