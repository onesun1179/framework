import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../../common/entity/common.entity';
import { IconGroup } from './icon-group';

@Entity()
@InputType({
  isAbstract: true,
  description: '아이콘 그룹 트리',
})
@ObjectType({
  description: '아이콘 그룹 트리',
})
export class IconGroupTree extends CommonEntity {
  @PrimaryColumn({
    comment: '자식 일련번호',
  })
  @Field(() => Int, {
    description: '자식 일련번호',
  })
  childSeqNo: number;

  @PrimaryColumn({
    comment: '부모 일련번호',
  })
  @Field(() => Int, {
    description: '부모 일련번호',
  })
  parentSeqNo: number;

  @ManyToOne(() => IconGroup, (o) => o.children)
  @JoinColumn({
    name: 'child_seq_no',
  })
  @Field(() => IconGroup, {
    description: '자식',
  })
  child: IconGroup;

  @ManyToOne(() => IconGroup, (o) => o.parents)
  @JoinColumn({
    name: 'parent_seq_no',
  })
  @Field(() => IconGroup, {
    description: '부모',
  })
  parent: IconGroup;
}
