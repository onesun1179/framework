import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { CodeMapEntity } from '@modules/code/entity';

@CustomRepository(CodeMapEntity)
export class CodeMapRepository extends Repository<CodeMapEntity> {}
