import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { FrontComponent } from './front-component';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('front', 'component', 'type'),
})
@ObjectType({
  description: UtilField.getFieldComment('front', 'component', 'type'),
})
export class FrontComponentType extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: UtilField.getFieldComment('front', 'component', 'type', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment(
      'front',
      'component',
      'type',
      'seqNo',
    ),
  })
  seqNo: number;

  @Column({
    comment: UtilField.getFieldComment('front', 'component', 'type', 'name'),
  })
  @Field({
    description: UtilField.getFieldComment(
      'front',
      'component',
      'type',
      'name',
    ),
  })
  name: string;

  @OneToMany(() => FrontComponent, (o) => o.frontComponentType)
  frontComponents: FrontComponent[];
}
