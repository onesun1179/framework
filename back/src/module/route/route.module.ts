import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteEntity } from '@modules/route/entity';

import { RouteResolver } from '@modules/route/resolvers';
import { RoleRouteMapEntity } from '@modules/role/entity';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { RouteRepository } from '@modules/route/repositories';
import {
  RoleRepository,
  RoleRouteMapRepository,
} from '@modules/role/repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RouteEntity, RoleRouteMapEntity]),
    TypeOrmExModule.forCustomRepository([
      RouteRepository,
      RoleRouteMapRepository,
      RoleRepository,
    ]),
  ],
  providers: [RouteService, RouteResolver],
  exports: [RouteService],
})
export class RouteModule {}
