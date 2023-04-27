import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { MenuService } from '@modules/menu/menu.service';
import { IconRepository } from '@modules/icon/repository/icon.repository';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { MenuResolver } from '@modules/menu/resolver/menu.resolver';
import { MenuRoleMapOutput } from '@modules/menu/dto/output/entity/menu-role-map.output';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';
import { MenuRepository } from '@modules/menu/repository/menu.repository';
import { MenuRoleMapRepository } from '@modules/menu/repository/menu-role-map.repository';
import { MenuByAuthResolver } from '@modules/menu/resolver/menu-by-auth.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuRoleMapOutput, MenuOutput]),
    TypeOrmExModule.forCustomRepository([
      MenuRepository,
      MenuRoleMapRepository,
      RoleRepository,
      IconRepository,
      RouteRepository,
    ]),
  ],
  providers: [MenuService, MenuResolver, MenuByAuthResolver, MenuResolver],
})
export class MenuModule {}
