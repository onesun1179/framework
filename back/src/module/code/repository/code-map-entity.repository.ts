import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { CodeMapEntity } from '@modules/code/dto/output/entity/code-map.entity';

@CustomRepository(CodeMapEntity)
export class CodeMapEntityRepository extends Repository<CodeMapEntity> {}
