import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../common/entity/common.entity';
import { IconGroup } from './IconGroup';

@Entity()
@ObjectType()
export class IconGroupTree extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  childId: number;

  @PrimaryColumn()
  @Field(() => Int)
  parentId: number;

  @ManyToOne(() => IconGroup, (o) => o.childList)
  @JoinColumn({
    name: 'child_id',
  })
  @Field(() => IconGroup)
  child: IconGroup;

  @ManyToOne(() => IconGroup, (o) => o.parentList)
  @JoinColumn({
    name: 'parent_id',
  })
  @Field(() => IconGroup)
  parent: IconGroup;
}
