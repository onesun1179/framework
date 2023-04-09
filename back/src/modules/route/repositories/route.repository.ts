import { CustomRepository } from '@common/docorator/CustomRepository';
import { Repository } from 'typeorm';
import { Route } from '@modules/route/models/route';

@CustomRepository(Route)
export class RouteRepository extends Repository<Route> {}
