import {
  IntersectionType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { MenuEntity } from '@modules/menu/entity/menu.entity';
import { MenuRoleMapEntity } from '@modules/menu/entity/menu-role-map.entity';

@ObjectType()
export class MenuByAuthOutput extends IntersectionType(
  OmitType(MenuEntity, ['menuRoleMaps']),
  PickType(MenuRoleMapEntity, ['orderNo', 'roleSeqNo', 'role']),
) {}
