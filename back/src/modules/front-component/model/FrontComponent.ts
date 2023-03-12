import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { FrontComponentType } from './FrontComponentType';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Route } from '../../route/models/Route';
import { UtilField } from '@util/Util.field';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('front', 'component'),
})
@ObjectType({
  description: UtilField.getFieldComment('front', 'component'),
})
export class FrontComponent extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: UtilField.getFieldComment('front', 'component', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('front', 'component', 'seqNo'),
  })
  seqNo: number;

  @Column({
    comment: UtilField.getFieldComment('front', 'component', 'name'),
  })
  @Field({
    description: UtilField.getFieldComment('front', 'component', 'name'),
  })
  name: string;

  @Column({
    comment: UtilField.getFieldComment('front', 'component', 'type', 'seqNo'),
  })
  @Field({
    description: UtilField.getFieldComment(
      'front',
      'component',
      'type',
      'seqNo',
    ),
  })
  frontComponentTypeSeqNo: number;

  @ManyToOne(() => FrontComponentType, (o) => o.frontComponents)
  @Field(() => FrontComponentType, {
    description: UtilField.getFieldComment('front', 'component', 'type'),
  })
  @JoinColumn({
    name: 'front_component_type_seq_no',
  })
  frontComponentType: FrontComponentType;

  @OneToMany(() => Route, (o) => o.frontComponent)
  @Field(() => [Route], {
    description: UtilField.getFieldComment('route', 's'),
  })
  routes: Route[];
}
