import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Auth } from '../../auth/model/Auth';
import { CommonEntity } from '../../common/entity/common.entity';
import { Menu } from './Menu';

@Entity()
export class MenusAuths extends CommonEntity {
  @PrimaryColumn()
  menuId: number;

  @PrimaryColumn()
  authId: number;

  @ManyToOne(() => Menu, (o) => o.menusAuths)
  menu: Menu;

  @ManyToOne(() => Auth, (o) => o.menusAuths)
  auth: Auth;
}
