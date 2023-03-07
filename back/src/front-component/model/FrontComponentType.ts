import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { FrontComponent } from './FrontComponent';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({
  description: '컴포넌트 타입',
})
export class FrontComponentType extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: '컴포넌트 타입 일련번호',
  })
  @Field(() => Int, {
    description: '컴포넌트 타입 일련번호',
  })
  seqNo: number;

  @Column({
    comment: '컴포넌트 타입 명',
  })
  @Field({
    description: '컴포넌트 타입 명',
  })
  name: string;

  @OneToMany(() => FrontComponent, (o) => o.frontComponentType)
  @Field(() => [FrontComponent], {
    description: '컴포넌트 목록',
  })
  frontComponents: FrontComponent[];
}
