import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './model/Menu';
import { MenuTree } from './model/MenuTree';
import { MenusAuths } from './model/MenusAuths';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, MenuTree, MenusAuths])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
