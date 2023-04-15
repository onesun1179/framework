import { Injectable, Logger } from '@nestjs/common';
import { MenuRepository } from '@modules/menu/repository';

@Injectable()
export class MenuService {
  constructor(private menuRepository: MenuRepository) {}
  private readonly logger = new Logger(MenuService.name);
}
