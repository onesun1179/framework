import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { Auth } from './Auth';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class AuthGroup extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo: number;

  @Column({
    nullable: false,
  })
  @Field({
    nullable: false,
  })
  name: string;

  @OneToMany(() => Auth, (o) => o.authGroup)
  @Field(() => [Auth])
  auths: Auth[];

  @OneToMany(() => AuthGroup, (o) => o.parent)
  @Field(() => [AuthGroup])
  children: AuthGroup[];

  @ManyToOne(() => AuthGroup, (o) => o.children)
  @Field(() => AuthGroup)
  parent: AuthGroup;
}
