import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { FrontComponentType } from './FrontComponentType';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class FrontComponent extends CommonEntity {
  @PrimaryColumn()
  @Field()
  id: string;

  @Column()
  @Field()
  value: string;

  @Column()
  @Field()
  initialValue: string;

  @ManyToOne(() => FrontComponentType, (o) => o.frontComponentList)
  @Field(() => FrontComponentType)
  frontComponentType: FrontComponentType;
}
