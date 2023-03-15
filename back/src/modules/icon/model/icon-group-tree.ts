import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { IconGroup } from './icon-group';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class IconGroupTree extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  childSeqNo: number;

  @PrimaryColumn()
  @Field(() => Int)
  parentSeqNo: number;

  @ManyToOne(() => IconGroup, (o) => o.children)
  @JoinColumn({
    name: 'child_seq_no',
  })
  @Field(() => IconGroup)
  child: IconGroup;

  @ManyToOne(() => IconGroup, (o) => o.parents)
  @JoinColumn({
    name: 'parent_seq_no',
  })
  @Field(() => IconGroup)
  parent: IconGroup;
}
