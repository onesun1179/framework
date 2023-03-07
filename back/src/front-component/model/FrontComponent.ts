import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { FrontComponentType } from './FrontComponentType';
import { Field, ObjectType } from '@nestjs/graphql';
import { FRONT_COMPONENT_MAP } from '../front-component.constant';
import { Route } from '../../route/model/Route';

@Entity()
@ObjectType()
export class FrontComponent extends CommonEntity {
  @PrimaryColumn({
    type: 'enum',
    enum: FRONT_COMPONENT_MAP,
  })
  @Field(() => FRONT_COMPONENT_MAP)
  id: keyof typeof FRONT_COMPONENT_MAP;

  @Column()
  @Field()
  value: string;

  @Column()
  @Field()
  initialValue: string;

  @ManyToOne(() => FrontComponentType, (o) => o.frontComponentList)
  @Field(() => FrontComponentType)
  frontComponentType: FrontComponentType;

  @OneToMany(() => Route, (o) => o.frontComponent)
  @Field(() => [Route], {
    defaultValue: [],
  })
  routeList: Array<Route>;
}
