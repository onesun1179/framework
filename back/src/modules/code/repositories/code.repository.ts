import { CustomRepository } from '@common/docorator/CustomRepository';
import { Code } from '@modules/code/entities/code.entity';
import { Repository } from 'typeorm';

@CustomRepository(Code)
export class CodeRepository extends Repository<Code> {}
