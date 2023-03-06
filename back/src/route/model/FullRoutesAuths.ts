import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Auth } from '../../auth/model/Auth';
import { CommonEntity } from '../../common/entity/common.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { FullRoute } from './FullRoute';

@Entity()
@ObjectType()
export class FullRoutesAuths extends CommonEntity {
  @PrimaryColumn()
  fullRouteId: number;

  @PrimaryColumn()
  authId: number;

  @ManyToOne(() => FullRoute, (o) => o.fullRoutesAuths)
  @JoinColumn({
    name: 'full_route_id',
  })
  @Field(() => FullRoute)
  fullRoute: FullRoute;

  @ManyToOne(() => Auth, (o) => o.fullRoutesAuths)
  @JoinColumn({
    name: 'auth_id',
  })
  @Field(() => Auth)
  auth: Auth;
}
