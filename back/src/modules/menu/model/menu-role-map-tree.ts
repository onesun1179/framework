import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MenuRoleMap } from '@modules/menu/model/menu-role-map';

@Entity()
@ObjectType('GqlMenuRoleMapTree')
@Index(['childMenuRoleMapSeqNo', 'parentMenuRoleMapSeqNo'], {
  unique: true,
})
export class MenuRoleMapTree extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo: number;

  @Column()
  @Field(() => Int)
  childMenuRoleMapSeqNo: number;

  @Column()
  @Field(() => Int)
  parentMenuRoleMapSeqNo: number;

  @ManyToOne(() => MenuRoleMap, (o) => o.children)
  @Field(() => MenuRoleMap)
  @JoinColumn({
    name: 'child_menu_role_map_seq_no',
  })
  childMenuRoleMap: MenuRoleMap;

  @ManyToOne(() => MenuRoleMap, (o) => o.parents)
  @Field(() => MenuRoleMap)
  @JoinColumn({
    name: 'parent_menu_role_map_seq_no',
  })
  parentMenuRoleMap: MenuRoleMap;
}
