import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AuthEntity } from '../../auth/entity/auth.entity';
import { CommonEntity } from '../../common/entity/common.entity';
import { MenuEntity } from './menu.entity';

@Entity({
  name: 'menus_by_auths',
})
export class MenusByAuthsEntity extends CommonEntity {
  @PrimaryColumn({
    comment: '메뉴 id',
  })
  menuId: MenuEntity['id'];

  @PrimaryColumn({
    comment: '권한 id',
  })
  authId: AuthEntity['id'];

  @ManyToOne(() => MenuEntity, (o) => o.menusByAuthsList)
  @JoinColumn({
    name: 'menu_id',
  })
  menu: MenuEntity;

  @ManyToOne(() => AuthEntity, (o) => o.menusByAuthsList)
  @JoinColumn({
    name: 'auth_id',
  })
  auth: AuthEntity;
}
