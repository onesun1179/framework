import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleFrontComponentMapEntity } from '@modules/role/entity/role-front-component-map.entity';

@CustomRepository(RoleFrontComponentMapEntity)
export class RoleFrontComponentMapRepository extends Repository<RoleFrontComponentMapEntity> {}
