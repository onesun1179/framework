import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { CodeMapOutput } from '@modules/code/dto/output/entity/code-map.output';

@CustomRepository(CodeMapOutput)
export class CodeMapRepository extends Repository<CodeMapOutput> {}
