import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { FullRoutesAuths } from './FullRoutesAuths';
import { FrontComponent } from '../../front-component/model/FrontComponent';
import { Field, ObjectType } from '@nestjs/graphql';
import { Route } from './Route';

@Entity()
@ObjectType()
export class FullRoute extends CommonEntity {
  @PrimaryColumn()
  id: number;

  @Column({
    nullable: true,
  })
  @Field()
  path?: string;

  @OneToOne(() => Route, {
    nullable: false,
  })
  @Field(() => Route, {
    nullable: false,
  })
  @JoinColumn({
    name: 'id',
  })
  route: Route;

  @OneToOne(() => FrontComponent)
  @Field(() => FrontComponent)
  frontRoute: FrontComponent;

  @OneToMany(() => FullRoutesAuths, (o) => o.fullRoute, {
    nullable: true,
  })
  @Field(() => [FullRoutesAuths], {
    nullable: true,
  })
  fullRoutesAuths?: FullRoutesAuths[];
}
