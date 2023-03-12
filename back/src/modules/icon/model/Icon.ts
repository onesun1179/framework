import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../../common/entity/common.entity';
import { IconGroup } from './IconGroup';
import { Menu } from '../../menu/model/Menu';

@Entity()
@InputType({
  isAbstract: true,
  description: '아이콘',
})
@ObjectType({
  description: '아이콘',
})
export class Icon extends CommonEntity {
  @PrimaryColumn({
    comment: '아이콘 식별자',
  })
  @Field({
    description: '아이콘 식별자',
  })
  id: string;

  @Column({
    comment: '아이콘 파일경로',
  })
  @Field({
    description: '아이콘 파일 경로',
  })
  filePath: string;

  @Column({
    comment: '아이콘 그룹 일련번호',
  })
  @Field(() => Int)
  iconGroupSeqNo: IconGroup['seqNo'];

  @ManyToOne(() => IconGroup, (o) => o.icons)
  @Field(() => IconGroup, {
    description: '아이콘 그룹',
  })
  @JoinColumn({
    name: 'icon_group_seq_no',
  })
  iconGroup: IconGroup;

  @ManyToOne(() => Menu, (o) => o.icon, {
    nullable: true,
  })
  @Field(() => [Menu], {
    description: '메뉴 목록',
    nullable: true,
  })
  menus: Array<Menu>;
}
