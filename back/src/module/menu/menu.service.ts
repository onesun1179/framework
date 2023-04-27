import { Injectable, Logger } from '@nestjs/common';
import { MenuRepository } from '@modules/menu/repository/menu.repository';
import { MenuRoleMapRepository } from '@modules/menu/repository/menu-role-map.repository';

@Injectable()
export class MenuService {
  private readonly logger = new Logger(MenuService.name);
  constructor(
    private menuRepository: MenuRepository,
    private menuRoleMapRepository: MenuRoleMapRepository,
  ) {}
}
