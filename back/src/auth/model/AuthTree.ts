import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { Auth } from './Auth';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class AuthTree extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  childId: number;

  @PrimaryColumn()
  @Field(() => Int)
  parentId: number;

  @ManyToOne(() => Auth, (o) => o.childList)
  @JoinColumn({
    name: 'child_id',
  })
  @Field(() => Auth)
  child: Auth;

  @ManyToOne(() => Auth, (o) => o.parentList)
  @JoinColumn({
    name: 'parent_id',
  })
  @Field(() => Auth)
  parent: Auth;
}
