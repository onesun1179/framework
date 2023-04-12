import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './model/menu';
import { MenuRoleMapTree } from './model/menu-role-map-tree';
import { MenuRoleMap } from './model/menu-role-map';
import { MenuResolver } from './resolvers/menu.resolver';
import { MenusResolver } from '@modules/menu/resolvers/menus.resolver';
import { TypeOrmExModule } from '@common/modules/TypeOrmExModule';
import { MenuRepository } from '@modules/menu/repositories/menu.repository';
import { MenuRoleMapTreeRepository } from '@modules/menu/repositories/menu-role-map-tree.repository';
import { MenuRoleMapRepository } from '@modules/menu/repositories/menu-role-map.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu, MenuRoleMap, MenuRoleMapTree]),
    TypeOrmExModule.forCustomRepository([
      MenuRepository,
      MenuRoleMapTreeRepository,
      MenuRoleMapRepository,
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService, MenuResolver, MenusResolver],
})
export class MenuModule {}
