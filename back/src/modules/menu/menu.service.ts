import { Injectable, Logger } from '@nestjs/common';
import { MenuRepository } from '@modules/menu/repositories/menu.repository';
import { MenuRoleMapTreeRepository } from '@modules/menu/repositories/menu-role-map-tree.repository';

@Injectable()
export class MenuService {
  constructor(
    private menuRepository: MenuRepository,
    private menuTreeRepository: MenuRoleMapTreeRepository,
  ) {}
  private readonly logger = new Logger(MenuService.name);

  getMenuRepository() {
    return this.menuRepository;
  }
  getMenuTreeRepository() {
    return this.menuTreeRepository;
  }
}
