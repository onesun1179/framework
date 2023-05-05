import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';

@CustomRepository(RoleOutput)
export class RoleRepository extends Repository<RoleOutput> {}
