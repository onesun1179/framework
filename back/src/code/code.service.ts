import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Code } from './model/Code';
import { FindManyOptions, Repository } from 'typeorm';
import { CodeTree } from './model/CodeTree';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private codeRepository: Repository<Code>,
    @InjectRepository(CodeTree)
    private codeTreeRepository: Repository<CodeTree>,
  ) {}

  getCode(id: Code['id']): Promise<Code | null> {
    return this.codeRepository.findOneBy({
      id,
    });
  }

  getCodeTree(
    childId: Code['id'],
    parentId: Code['id'],
  ): Promise<CodeTree | null> {
    return this.codeTreeRepository.findOneBy({
      childId,
      parentId,
    });
  }

  getCodeTreeList(option: FindManyOptions<CodeTree>): Promise<CodeTree[]> {
    return this.codeTreeRepository.find(option);
  }

  getCodeList(option: FindManyOptions<Code>): Promise<Code[]> {
    return this.codeRepository.find(option);
  }

  saveCode(code: Code): Promise<Code> {
    return this.codeRepository.save(code);
  }

  saveCodeTree(codeTree: CodeTree): Promise<CodeTree> {
    return this.codeTreeRepository.save(codeTree);
  }
}
