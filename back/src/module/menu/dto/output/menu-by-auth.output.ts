import {
  IntersectionType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { MenuEntity, MenuRoleMapEntity } from '@modules/menu/entity';

@ObjectType()
export class MenuByAuthOutput extends IntersectionType(
  OmitType(MenuEntity, ['menuRoleMaps']),
  PickType(MenuRoleMapEntity, ['orderNo', 'roleSeqNo', 'role']),
) {}
