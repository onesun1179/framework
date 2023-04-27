import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleRouteMapOutput } from '@modules/role/dto/output/entity/role-route-map.output';

@CustomRepository(RoleRouteMapOutput)
export class RoleRouteMapRepository extends Repository<RoleRouteMapOutput> {}
