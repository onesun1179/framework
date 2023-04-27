import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { CodeOutput } from '@modules/code/dto/output/entity/code.output';

@CustomRepository(CodeOutput)
export class CodeRepository extends Repository<CodeOutput> {}
