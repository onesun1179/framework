import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { FrontComponentType } from './FrontComponentType';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Route } from '../../route/models/Route';

@Entity()
@ObjectType({
  description: '컴포넌트',
})
export class FrontComponent extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: '컴포넌트 일련번호',
  })
  @Field(() => Int, {
    description: '컴포넌트 일련번호',
  })
  seqNo: number;

  @Column({
    comment: '컴포넌트 명',
  })
  @Field({
    description: '컴포넌트 명',
  })
  name: string;

  @Column({
    comment: '컴포넌트 타입 일련번호',
  })
  @Field({
    description: '컴포넌트 타입 일련번호',
  })
  frontComponentTypeSeqNo: number;

  @ManyToOne(() => FrontComponentType, (o) => o.frontComponents)
  @Field(() => FrontComponentType, {
    description: '컴포넌트 타입',
  })
  @JoinColumn({
    name: 'front_component_type_seq_no',
  })
  frontComponentType: FrontComponentType;

  @OneToMany(() => Route, (o) => o.frontComponent)
  @Field(() => [Route], {
    description: '라우트 목록',
  })
  routes: Route[];
}
