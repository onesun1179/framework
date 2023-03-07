import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Auth } from '../../auth/model/Auth';
import { CommonEntity } from '../../common/entity/common.entity';
import { Route } from './Route';

@Entity()
export class RoutesAuths extends CommonEntity {
  @PrimaryColumn()
  routeId: number;

  @PrimaryColumn()
  authId: number;

  @ManyToOne(() => Route, (o) => o.routesAuths, {
    lazy: true,
  })
  @JoinColumn({
    name: 'route_id',
  })
  route: Route;

  @ManyToOne(() => Auth, (o) => o.routesAuths, {
    lazy: true,
  })
  @JoinColumn({
    name: 'auth_id',
  })
  auth: Auth;
}
