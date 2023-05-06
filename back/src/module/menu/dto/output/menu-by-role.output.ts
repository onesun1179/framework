import { ObjectType, PickType } from '@nestjs/graphql';
import { MenuRoleMapEntity } from '@modules/menu/dto/output/entity/menu-role-map.entity';
import { Builder } from 'builder-pattern';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { Type } from 'class-transformer';

@ObjectType()
export class MenuByRoleOutput extends PickType(
  MenuRoleMapEntity,
  ['seqNo', 'orderNo', 'roleSeqNo', 'parentSeqNo', 'menuSeqNo'],
  ObjectType,
) {
  @Type(() => MenuEntity)
  menu!: MenuEntity;
  static toThis(menuRoleMap: MenuRoleMapEntity) {
    return Builder(MenuByRoleOutput, {
      seqNo: menuRoleMap.seqNo,
      roleSeqNo: menuRoleMap.roleSeqNo,
      orderNo: menuRoleMap.orderNo,
      parentSeqNo: menuRoleMap.parentSeqNo,
      menuSeqNo: menuRoleMap.menuSeqNo,
      menu: menuRoleMap.menu,
    }).build();
  }
}
