import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { User } from '../../user/models/User';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { RoleGroup } from './RoleGroup';
import { Menu } from '../../menu/model/Menu';
import { UtilField } from '@util/Util.field';
import { RoleRouteMap } from '@modules/role/model/RoleRouteMap';
import { MenuRoleMap } from '@modules/menu/model/MenuRoleMap';

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
  roleRouteMaps: RoleRouteMap[];

  routes: [];
}
