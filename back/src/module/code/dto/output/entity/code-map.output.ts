import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { CodeOutput } from '@modules/code/dto/output/entity/code.output';

@Entity('code_map')
@ObjectType()
export class CodeMapOutput extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  childSeqNo!: number;

  @PrimaryColumn()
  @Field(() => Int)
  parentSeqNo!: number;

  @ManyToOne(() => CodeOutput, (o) => o.children)
  @JoinColumn({
    name: 'child_seq_no',
  })
  @Type(() => CodeOutput)
  child!: CodeOutput;

  @ManyToOne(() => CodeOutput, (o) => o.parents)
  @JoinColumn({
    name: 'parent_seq_no',
  })
  @Type(() => CodeOutput)
  parent!: CodeOutput;
}
