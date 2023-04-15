import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { IconGroupEntity } from './icon-group.entity';
import { Type } from 'class-transformer';

@Entity('icon_group_tree')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class IconGroupTreeEntity extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  childSeqNo!: number;

  @PrimaryColumn()
  @Field(() => Int)
  parentSeqNo!: number;

  @ManyToOne(() => IconGroupEntity, (o) => o.children)
  @JoinColumn({
    name: 'child_seq_no',
  })
  @Type(() => IconGroupEntity)
  child!: IconGroupEntity;

  @ManyToOne(() => IconGroupEntity, (o) => o.parents)
  @JoinColumn({
    name: 'parent_seq_no',
  })
  @Type(() => IconGroupEntity)
  parent!: IconGroupEntity;
}
