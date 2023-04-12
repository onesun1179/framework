import { Repository } from 'typeorm';
import { RoleFrontComponentMap } from '@modules/role/entities/role-front-component-map.entity';
import { CustomRepository } from '@common/docorator/CustomRepository';

@CustomRepository(RoleFrontComponentMap)
export class RoleFrontComponentMapRepository extends Repository<RoleFrontComponentMap> {}
