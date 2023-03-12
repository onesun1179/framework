import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Menu } from './menu';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({
  description: '메뉴 트리',
})
export class MenuTree extends CommonEntity {
  @PrimaryColumn({
    comment: '자식 일련번호',
  })
  childMenuSeqNo: number;

  @PrimaryColumn({
    comment: '부모 일련번호',
  })
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
