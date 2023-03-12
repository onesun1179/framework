import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { MenuTree } from './MenuTree';
import { MenuRoleMap } from './MenuRoleMap';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Icon } from '../../icon/model/Icon';
import { Role } from '../../role/model/Role';
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
