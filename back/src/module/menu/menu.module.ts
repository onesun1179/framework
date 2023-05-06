import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { MenuService } from '@modules/menu/menu.service';
import { IconRepository } from '@modules/icon/repository/icon.repository';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { MenuResolver } from '@modules/menu/resolver/menu.resolver';
import { MenuRoleMapEntity } from '@modules/menu/dto/output/entity/menu-role-map.entity';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { MenuRepository } from '@modules/menu/repository/menu.repository';
import { MenuRoleMapRepository } from '@modules/menu/repository/menu-role-map.repository';
import { MenuByRoleResolver } from '@modules/menu/resolver/menu-by-role.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuRoleMapEntity, MenuEntity]),
    TypeOrmExModule.forCustomRepository([
      MenuRepository,
      MenuRoleMapRepository,
      RoleRepository,
      IconRepository,
      RouteRepository,
    ]),
  ],
  providers: [MenuService, MenuResolver, MenuByRoleResolver],
})
export class MenuModule {}
