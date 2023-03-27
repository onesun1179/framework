import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './model/menu';
import { MenuRoleMapTree } from './model/menu-role-map-tree';
import { MenuRoleMap } from './model/menu-role-map';
import { MenuResolver } from './resolvers/menu.resolver';
import { MenusResolver } from '@modules/menu/resolvers/menus.resolver';
import { MenusPagingResolver } from '@modules/menu/resolvers/menus-paging.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, MenuRoleMap, MenuRoleMapTree])],
  controllers: [MenuController],
  providers: [MenuService, MenuResolver, MenusResolver, MenusPagingResolver],
})
export class MenuModule {}
