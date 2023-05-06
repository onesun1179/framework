import { InputType, PickType } from '@nestjs/graphql';
import { MenuRoleMapEntity } from '@modules/menu/dto/output/entity/menu-role-map.entity';

@InputType()
export class RearrangementMenuInput extends PickType(MenuRoleMapEntity, [
  'seqNo',
  'orderNo',
  'parentSeqNo',
]) {}
