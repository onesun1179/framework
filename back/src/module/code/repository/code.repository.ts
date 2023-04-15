import { CustomRepository } from '@common/decorator/CustomRepository';
import { CodeEntity } from '@modules/code/entity';
import { Repository } from 'typeorm';

@CustomRepository(CodeEntity)
export class CodeRepository extends Repository<CodeEntity> {}
