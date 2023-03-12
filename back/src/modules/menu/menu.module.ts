import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './model/menu';
import { MenuTree } from './model/menu-tree';
import { MenuRoleMap } from './model/menu-role-map';
import { MenuResolver } from './resolvers/menu.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, MenuTree, MenuRoleMap])],
  controllers: [MenuController],
  providers: [MenuService, MenuResolver],
})
export class MenuModule {}
