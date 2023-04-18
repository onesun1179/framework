import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleRouteMapEntity } from '@modules/role/dto/output/entity/role-route-map.entity';

@CustomRepository(RoleRouteMapEntity)
export class RoleRouteMapEntityRepository extends Repository<RoleRouteMapEntity> {}
