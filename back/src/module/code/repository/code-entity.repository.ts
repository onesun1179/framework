import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { CodeEntity } from '@modules/code/dto/output/entity/code.entity';

@CustomRepository(CodeEntity)
export class CodeEntityRepository extends Repository<CodeEntity> {}
