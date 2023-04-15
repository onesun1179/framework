import { Repository } from 'typeorm';
import { RoleRouteMapEntity } from '@modules/role/entity';
import { CustomRepository } from '@common/decorator/CustomRepository';

@CustomRepository(RoleRouteMapEntity)
export class RoleRouteMapRepository extends Repository<RoleRouteMapEntity> {}
