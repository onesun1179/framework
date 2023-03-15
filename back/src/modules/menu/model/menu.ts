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

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class Menu extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => MenuTree, (o) => o.childMenu)
  childMenuTrees: MenuTree[];

  @Field(() => [Menu])
  children: Menu[];

  @OneToMany(() => MenuTree, (o) => o.parentMenu)
  parentMenuTrees: MenuTree[];

  @Field(() => [Menu])
  parents: Menu[];

  @Field(() => [Role])
  roles: Role[];

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  iconSeqNo?: number;

  @ManyToOne(() => Icon, (o) => o.menus, {
    nullable: true,
  })
  @Field(() => Icon, {
    nullable: true,
  })
  @JoinColumn({
    name: 'icon_seq_no',
  })
  icon?: Icon;

  @OneToMany(() => MenuRoleMap, (o) => o.menu)
  menuRoleMaps: MenuRoleMap[];
}
