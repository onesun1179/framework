import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { MenuRoleMapEntity } from '@modules/menu/entity/menu-role-map.entity';
import { MenuEntity } from '@modules/menu/entity/menu.entity';
import { MenuRepository } from '@modules/menu/repository/menu.repository';
import { MenuRoleMapRepository } from '@modules/menu/repository/menu-role-map.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { MenuService } from '@modules/menu/menu.service';
import { MenuResolver } from '@modules/menu/resolver/menu.resolver';
import { MenuByAuthResolver } from '@modules/menu/resolver/menu-by-auth.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuRoleMapEntity, MenuEntity]),
    TypeOrmExModule.forCustomRepository([
      MenuRepository,
      MenuRoleMapRepository,
      RoleRepository,
    ]),
  ],
  providers: [MenuService, MenuResolver, MenuByAuthResolver],
})
export class MenuModule {}
