import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Menu } from './menu';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class MenuTree extends CommonEntity {
  @PrimaryColumn()
  childMenuSeqNo: number;

  @PrimaryColumn()
  parentMenuSeqNo: number;

  @ManyToOne(() => Menu, (o) => o.children)
  @Field(() => Menu)
  @JoinColumn({
    name: 'child_menu_seq_no',
  })
  childMenu: Menu;

  @ManyToOne(() => Menu, (o) => o.parents)
  @Field(() => Menu)
  @JoinColumn({
    name: 'parent_menu_seq_no',
  })
  parentMenu: Menu;
}
