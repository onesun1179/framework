import { CustomRepository } from '@common/docorator/CustomRepository';
import { Menu } from '@modules/menu/model/menu';
import { Repository } from 'typeorm';

@CustomRepository(Menu)
export class MenuRepository extends Repository<Menu> {}
