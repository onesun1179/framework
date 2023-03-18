import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Role } from '@modules/role/model/role';
import { CommonEntity } from '@common/entity/common.entity';
import { Menu } from './menu';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { MenuRoleMapTree } from '@modules/menu/model/menu-role-map-tree';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
@Index(['menuSeqNo', 'roleSeqNo'], {
  unique: true,
})
export class MenuRoleMap extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo: number;

  @Column()
  @Field(() => Int)
  menuSeqNo: number;

  @Column()
  @Field(() => Int)
  roleSeqNo: number;

  @ManyToOne(() => Menu, (o) => o.menuRoleMaps)
  @Field(() => Menu)
  @JoinColumn({
    name: 'menu_seq_no',
  })
  menu: Menu;

  @ManyToOne(() => Role, (o) => o.menuRoleMaps)
  @Field(() => Role)
  @JoinColumn({
    name: 'role_seq_no',
  })
  role: Role;

  @Field(() => Int)
  @Column({
    type: 'int',
  })
  orderNo: number;

  @RelationId((o: MenuRoleMap) => o.parents)
  parentSeqNos: Array<number>;

  @RelationId((o: MenuRoleMap) => o.children)
  childSeqNos: Array<number>;

  @OneToMany(() => MenuRoleMapTree, (o) => o.parentMenuRoleMap)
  parents: MenuRoleMapTree[];

  @OneToMany(() => MenuRoleMapTree, (o) => o.childMenuRoleMap)
  children: MenuRoleMapTree[];
}
