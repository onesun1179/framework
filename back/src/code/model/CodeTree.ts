import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Code } from './Code';
import { CommonEntity } from '../../common/entity/common.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class CodeTree extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  childId: number;

  @PrimaryColumn()
  @Field(() => Int)
  parentId: number;

  @ManyToOne(() => Code, (o) => o.childList)
  @JoinColumn({
    name: 'child_id',
  })
  @Field(() => Code)
  child: Code;

  @ManyToOne(() => Code, (o) => o.parentList)
  @JoinColumn({
    name: 'parent_id',
  })
  @Field(() => Code)
  parent: Code;
}
