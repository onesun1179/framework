import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { User } from '@modules/user/models/user';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { RoleGroup } from './role-group';
import { Menu } from '@modules/menu/model/menu';
import { UtilField } from '@util/Util.field';
import { RoleRouteMap } from '@modules/role/model/role-route-map';
import { MenuRoleMap } from '@modules/menu/model/menu-role-map';
import { RoleFrontComponentMap } from '@modules/role/model/role-front-component-map';
import { FrontComponent } from '@modules/front-component/model/front-component';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('role'),
})
@ObjectType({
  description: UtilField.getFieldComment('role'),
})
export class Role extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: UtilField.getFieldComment('role', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('role', 'seqNo'),
  })
  seqNo: number;
  @Column({
    comment: UtilField.getFieldComment('role', 'name'),
  })
  @Field({
    description: UtilField.getFieldComment('role', 'name'),
  })
  name: string;

  @Column()
  @Field(() => Int, {
    description: UtilField.getFieldComment('role', 'group', 'seqNo'),
  })
  roleGroupSeqNo: number;
  @ManyToOne(() => RoleGroup, (o) => o.roles)
  @JoinColumn({
    name: 'role_group_seq_no',
  })
  roleGroup: RoleGroup;
  @OneToMany(() => User, (o) => o.role)
  users: User[];

  @OneToMany(() => MenuRoleMap, (o) => o.role)
  menuRoleMaps: MenuRoleMap[];

  menus: Menu[];

  @OneToMany(() => RoleRouteMap, (o) => o.route)
  roleRouteMaps: Array<RoleRouteMap>;

  routes: [];

  @OneToMany(() => RoleFrontComponentMap, (o) => o.role)
  roleFrontComponentMaps: Array<RoleFrontComponentMap>;

  frontComponents: Array<FrontComponent>;
}
