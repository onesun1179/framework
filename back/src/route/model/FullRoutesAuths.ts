import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Auth } from '../../auth/model/Auth';
import { CommonEntity } from '../../common/entity/common.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FullRoute } from './FullRoute';

@Entity()
@ObjectType()
export class FullRoutesAuths extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  fullRouteId: number;

  @PrimaryColumn()
  @Field(() => Int)
  authId: number;

  @ManyToOne(() => FullRoute, (o) => o.fullRoutesAuths, {
    lazy: true,
  })
  @JoinColumn({
    name: 'full_route_id',
  })
  @Field(() => FullRoute)
  fullRoute: FullRoute;

  @ManyToOne(() => Auth, (o) => o.fullRoutesAuths, {
    lazy: true,
  })
  @JoinColumn({
    name: 'auth_id',
  })
  @Field(() => Auth)
  auth: Auth;
}
