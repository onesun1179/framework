import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Code } from './Code';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class CodeTree extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  childSeqNo: number;

  @PrimaryColumn()
  @Field(() => Int)
  parentSeqNo: number;

  @ManyToOne(() => Code, (o) => o.children)
  @JoinColumn({
    name: 'child_seq_no',
  })
  @Field(() => Code)
  child: Code;

  @ManyToOne(() => Code, (o) => o.parents)
  @JoinColumn({
    name: 'parent_seq_no',
  })
  @Field(() => Code)
  parent: Code;
}
