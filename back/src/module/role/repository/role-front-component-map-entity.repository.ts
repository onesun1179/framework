import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleFrontComponentMapEntity } from '@modules/role/dto/output/entity/role-front-component-map.entity';

@CustomRepository(RoleFrontComponentMapEntity)
export class RoleFrontComponentMapEntityRepository extends Repository<RoleFrontComponentMapEntity> {}
