import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { CodeMapEntity } from '../entity/code-map.entity';

@CustomRepository(CodeMapEntity)
export class CodeMapRepository extends Repository<CodeMapEntity> {}
