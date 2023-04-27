import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleFrontComponentMapOutput } from '@modules/role/dto/output/entity/role-front-component-map.output';

@CustomRepository(RoleFrontComponentMapOutput)
export class RoleFrontComponentMapRepository extends Repository<RoleFrontComponentMapOutput> {}
