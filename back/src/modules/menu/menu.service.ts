import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './model/menu';
import { MenuRoleMapTree } from './model/menu-role-map-tree';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(MenuRoleMapTree)
    private menuTreeRepository: Repository<MenuRoleMapTree>,
  ) {}
  private readonly logger = new Logger(MenuService.name);

  getMenuRepository() {
    return this.menuRepository;
  }
  getMenuTreeRepository() {
    return this.menuTreeRepository;
  }
}
