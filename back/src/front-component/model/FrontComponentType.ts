import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { FrontComponent } from './FrontComponent';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class FrontComponentType extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => FrontComponent, (o) => o.frontComponentType)
  @Field(() => [FrontComponent])
  frontComponentList: FrontComponent[];
}
