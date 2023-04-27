import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { IconGroupOutput } from '@modules/icon/dto/output/entity/icon-group.output';

@Entity('icon_group_tree')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class IconGroupTreeOutput extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  childSeqNo!: number;

  @PrimaryColumn()
  @Field(() => Int)
  parentSeqNo!: number;

  @ManyToOne(() => IconGroupOutput, (o) => o.children)
  @JoinColumn({
    name: 'child_seq_no',
  })
  @Type(() => IconGroupOutput)
  child!: IconGroupOutput;

  @ManyToOne(() => IconGroupOutput, (o) => o.parents)
  @JoinColumn({
    name: 'parent_seq_no',
  })
  @Type(() => IconGroupOutput)
  parent!: IconGroupOutput;
}
