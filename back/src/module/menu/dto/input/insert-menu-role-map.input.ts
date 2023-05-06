import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { MenuRoleMapEntity } from '@modules/menu/dto/output/entity/menu-role-map.entity';

@ArgsType()
@InputType()
export class InsertMenuRoleMapInput extends PickType(MenuRoleMapEntity, [
  'menuSeqNo',
  'roleSeqNo',
  'desc',
]) {}
