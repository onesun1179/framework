import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CodeEntity } from './code.entity';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@Entity('code_map')
@ObjectType()
export class CodeMapEntity extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  childSeqNo!: number;

  @PrimaryColumn()
  @Field(() => Int)
  parentSeqNo!: number;

  @ManyToOne(() => CodeEntity, (o) => o.children)
  @JoinColumn({
    name: 'child_seq_no',
  })
  @Type(() => CodeEntity)
  child!: CodeEntity;

  @ManyToOne(() => CodeEntity, (o) => o.parents)
  @JoinColumn({
    name: 'parent_seq_no',
  })
  @Type(() => CodeEntity)
  parent!: CodeEntity;
}
