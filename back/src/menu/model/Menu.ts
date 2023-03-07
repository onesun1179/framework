import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { MenuTree } from './MenuTree';
import { MenusAuths } from './MenusAuths';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Icon } from '../../icon/model/Icon';
import { Auth } from '../../auth/model/Auth';

@Entity()
@ObjectType({
  description: '메뉴',
})
export class Menu extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: '메뉴 일련번호',
  })
  @Field(() => Int, {
    description: '메뉴 일련번호',
  })
  seqNo: number;

  @Column({
    comment: '메뉴 명',
  })
  @Field({
    description: '메뉴 명',
  })
  name: string;

  @OneToMany(() => MenuTree, (o) => o.childMenu)
  childMenuTrees: MenuTree[];

  @Field(() => [Menu], {
    description: '자식메뉴 목록',
  })
  children: Menu[];

  @OneToMany(() => MenuTree, (o) => o.parentMenu)
  parentMenuTrees: MenuTree[];

  @Field(() => [Menu], {
    description: '부모메뉴 목록',
  })
  parents: Menu[];

  @Field(() => [Auth], {
    description: '권한 목록',
  })
  auths: Auth[];

  @Column({
    comment: '아이콘 식별자',
  })
  @Field({
    description: '아이콘 식별자',
  })
  iconId: string;

  @ManyToOne(() => Icon, (o) => o.menus)
  @Field(() => Icon, {
    description: '아이콘',
  })
  @JoinColumn({
    name: 'icon_id',
  })
  icon: Icon;

  @OneToMany(() => MenusAuths, (o) => o.menu)
  menusAuths: MenusAuths[];
}
