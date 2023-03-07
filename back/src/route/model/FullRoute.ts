import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { FullRoutesAuths } from './FullRoutesAuths';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Route } from './Route';

@Entity()
@ObjectType()
export class FullRoute extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  id: number;

  @OneToOne(() => Route, {
    lazy: true,
  })
  @Field(() => Route)
  @JoinColumn({
    name: 'id',
  })
  route: Route;

  @OneToMany(() => FullRoutesAuths, (o) => o.fullRoute, {
    lazy: true,
  })
  @Field(() => [FullRoutesAuths], {
    defaultValue: [],
  })
  fullRoutesAuths: FullRoutesAuths[];
}
