import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { MenuTree } from './menu-tree';
import { MenuRoleMap } from './menu-role-map';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Icon } from '@modules/icon/model/icon';
import { Role } from '@modules/role/model/role';
import { UtilField } from '@util/Util.field';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('menu'),
})
@ObjectType({
  description: UtilField.getFieldComment('menu'),
})
export class Menu extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: UtilField.getFieldComment('menu', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('menu', 'seqNo'),
  })
  seqNo: number;

  @Column({
    comment: UtilField.getFieldComment('menu', 'name'),
  })
  @Field({
    description: UtilField.getFieldComment('menu', 'name'),
  })
  name: string;

  @OneToMany(() => MenuTree, (o) => o.childMenu)
  childMenuTrees: MenuTree[];

  @Field(() => [Menu], {
    description: UtilField.getFieldComment('child', 's'),
  })
  children: Menu[];

  @OneToMany(() => MenuTree, (o) => o.parentMenu)
  parentMenuTrees: MenuTree[];

  @Field(() => [Menu], {
    description: UtilField.getFieldComment('parent', 's'),
  })
  parents: Menu[];

  @Field(() => [Role], {
    description: UtilField.getFieldComment('role', 's'),
  })
  roles: Role[];

  @Column({
    comment: UtilField.getFieldComment('icon', 'id'),
    nullable: true,
  })
  @Field({
    description: UtilField.getFieldComment('icon', 'id'),
    nullable: true,
  })
  iconId?: string;

  @ManyToOne(() => Icon, (o) => o.menus, {
    nullable: true,
  })
  @Field(() => Icon, {
    description: UtilField.getFieldComment('icon'),
    nullable: true,
  })
  @JoinColumn({
    name: 'icon_id',
  })
  icon?: Icon;

  @OneToMany(() => MenuRoleMap, (o) => o.menu)
  menuRoleMaps: MenuRoleMap[];
}
