import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Route } from './Route';
import { Auth } from '../../auth/model/Auth';
import { CommonEntity } from '../../common/entity/common.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class RoutesAuths extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  routeId: number;

  @PrimaryColumn()
  @Field(() => Int)
  authId: number;

  @ManyToOne(() => Route, (o) => o.routesAuthsList)
  @JoinColumn({
    name: 'route_id',
  })
  @Field(() => Route)
  route: Route;

  @ManyToOne(() => Auth, (o) => o.routesByAuthsList)
  @JoinColumn({
    name: 'auth_id',
  })
  @Field(() => Auth)
  auth: Auth;
}
