import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Code } from './code.entity';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UtilField } from '@common/utils/util.field';

@Entity()
@ObjectType('GqlCodeMap', {
  description: UtilField.getFieldComment('code', 'map'),
})
export class CodeMap extends CommonEntity {
  @PrimaryColumn({
    comment: UtilField.getFieldComment('child', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('child', 'seqNo'),
  })
  childSeqNo: number;

  @PrimaryColumn({
    comment: UtilField.getFieldComment('parent', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('parent', 'seqNo'),
  })
  parentSeqNo: number;

  @ManyToOne(() => Code, (o) => o.children)
  @JoinColumn({
    name: 'child_seq_no',
  })
  @Field(() => Code, {
    description: UtilField.getFieldComment('child'),
  })
  child: Code;

  @ManyToOne(() => Code, (o) => o.parents)
  @JoinColumn({
    name: 'parent_seq_no',
  })
  @Field(() => Code, {
    description: UtilField.getFieldComment('parent'),
  })
  parent: Code;
}
