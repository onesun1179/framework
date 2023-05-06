import {
  ArgsType,
  InputType,
  IntersectionType,
  PickType,
} from '@nestjs/graphql';
import { MenuRoleMapEntity } from '@modules/menu/dto/output/entity/menu-role-map.entity';
import { InsertMenuRoleMapInput } from '@modules/menu/dto/input/insert-menu-role-map.input';

@ArgsType()
@InputType()
export class UpdateMenuRoleMapInput extends IntersectionType(
  InsertMenuRoleMapInput,
  PickType(MenuRoleMapEntity, ['seqNo']),
  InputType,
) {}
