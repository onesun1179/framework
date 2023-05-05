import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RouteService } from '@modules/route/route.service';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';
import { RoleRouteMapOutput } from '@modules/role/dto/output/entity/role-route-map.output';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { RoleRouteMapRepository } from '@modules/role/repository/role-route-map.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { RouteResolver } from '@modules/route/resolvers/route.resolver';
import { MenuRepository } from '@modules/menu/repository/menu.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RouteOutput, RoleRouteMapOutput]),
    TypeOrmExModule.forCustomRepository([
      RouteRepository,
      RoleRouteMapRepository,
      RoleRepository,
      MenuRepository,
    ]),
  ],
  providers: [RouteResolver, RouteService, RouteResolver],
  exports: [RouteService],
})
export class RouteModule {}
