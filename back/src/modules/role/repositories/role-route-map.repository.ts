import { Repository } from 'typeorm';
import { RoleRouteMap } from '@modules/role/entities/role-route-map.entity';
import { CustomRepository } from '@common/docorator/CustomRepository';

@CustomRepository(RoleRouteMap)
export class RoleRouteMapRepository extends Repository<RoleRouteMap> {}
