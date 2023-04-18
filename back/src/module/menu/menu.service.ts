import { Injectable, Logger } from '@nestjs/common';
import { MenuEntityRepository } from '@modules/menu/repository/menu-entity.repository';
import { MenuRoleMapEntityRepository } from '@modules/menu/repository/menu-role-map-entity.repository';

@Injectable()
export class MenuService {
  private readonly logger = new Logger(MenuService.name);
  constructor(
    private menuRepository: MenuEntityRepository,
    private menuRoleMapRepository: MenuRoleMapEntityRepository,
  ) {}
}
