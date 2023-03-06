import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { FrontComponentType } from './FrontComponentType';
import { Field, ObjectType } from '@nestjs/graphql';
import { FRONT_COMPONENT_MAP } from '../front-component.constant';

@Entity()
@ObjectType()
export class FrontComponent extends CommonEntity {
  @PrimaryColumn({
    type: 'enum',
    enum: FRONT_COMPONENT_MAP,
  })
  @Field(() => FRONT_COMPONENT_MAP)
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
