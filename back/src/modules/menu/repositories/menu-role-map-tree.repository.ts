import { CustomRepository } from '@common/docorator/CustomRepository';
import { Repository } from 'typeorm';
import { MenuRoleMapTree } from '@modules/menu/model/menu-role-map-tree';

@CustomRepository(MenuRoleMapTree)
export class MenuRoleMapTreeRepository extends Repository<MenuRoleMapTree> {}
