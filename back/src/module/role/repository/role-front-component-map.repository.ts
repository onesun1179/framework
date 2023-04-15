import { Repository } from 'typeorm';
import { RoleFrontComponentMapEntity } from '@modules/role/entity';
import { CustomRepository } from '@common/decorator/CustomRepository';

@CustomRepository(RoleFrontComponentMapEntity)
export class RoleFrontComponentMapRepository extends Repository<RoleFrontComponentMapEntity> {}
