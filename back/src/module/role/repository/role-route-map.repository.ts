import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleRouteMapEntity } from '@modules/role/entity/role-route-map.entity';

@CustomRepository(RoleRouteMapEntity)
export class RoleRouteMapRepository extends Repository<RoleRouteMapEntity> {}
