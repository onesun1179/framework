import { CustomRepository } from '@common/docorator/CustomRepository';
import { Repository } from 'typeorm';
import { CodeMap } from '@modules/code/entities/code-map.entity';

@CustomRepository(CodeMap)
export class CodeMapRepository extends Repository<CodeMap> {}
