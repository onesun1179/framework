import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { RoleEntityRepository } from '@modules/role/repository/role-entity.repository';
import { MenuService } from '@modules/menu/menu.service';
import { IconEntityRepository } from '@modules/icon/repository/icon-entity.repository';
import { RouteEntityRepository } from '@modules/route/repository/route-entity.repository';
import { MenuResolver } from '@modules/menu/resolver/menu.resolver';
import { MenuRoleMapEntity } from '@modules/menu/dto/output/entity/menu-role-map.entity';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { MenuEntityRepository } from '@modules/menu/repository/menu-entity.repository';
import { MenuRoleMapEntityRepository } from '@modules/menu/repository/menu-role-map-entity.repository';
import { MenuEntityResolver } from '@modules/menu/resolver/menu-entity.resolver';
import { MenuByAuthEntityResolver } from '@modules/menu/resolver/menu-by-auth-entity.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuRoleMapEntity, MenuEntity]),
    TypeOrmExModule.forCustomRepository([
      MenuEntityRepository,
      MenuRoleMapEntityRepository,
      RoleEntityRepository,
      IconEntityRepository,
      RouteEntityRepository,
    ]),
  ],
  providers: [
    MenuService,
    MenuEntityResolver,
    MenuByAuthEntityResolver,
    MenuResolver,
  ],
})
export class MenuModule {}
