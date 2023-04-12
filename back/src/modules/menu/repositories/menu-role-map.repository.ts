import { CustomRepository } from '@common/docorator/CustomRepository';
import { Repository } from 'typeorm';
import { MenuRoleMap } from '@modules/menu/model/menu-role-map';

@CustomRepository(MenuRoleMap)
export class MenuRoleMapRepository extends Repository<MenuRoleMap> {}
