import { Injectable, Logger } from '@nestjs/common';
import { MenuRepository } from '@modules/menu/repository/menu.repository';

@Injectable()
export class MenuService {
  private readonly logger = new Logger(MenuService.name);

  constructor(private menuRepository: MenuRepository) {}
}
