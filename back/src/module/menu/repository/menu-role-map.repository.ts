import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { MenuRoleMapEntity } from '@modules/menu/entity/menu-role-map.entity';

@CustomRepository(MenuRoleMapEntity)
export class MenuRoleMapRepository extends Repository<MenuRoleMapEntity> {}