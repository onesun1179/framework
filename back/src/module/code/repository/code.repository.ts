import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { CodeEntity } from '../entity/code.entity';

@CustomRepository(CodeEntity)
export class CodeRepository extends Repository<CodeEntity> {}
