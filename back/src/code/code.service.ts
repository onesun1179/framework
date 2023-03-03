import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeEntity } from './entity/code.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CodeTreeEntity } from './entity/codeTree.entity';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(CodeEntity)
    private codeRepository: Repository<CodeEntity>,
    @InjectRepository(CodeTreeEntity)
    private codeTreeRepository: Repository<CodeTreeEntity>,
  ) {}

  getCode(id: CodeEntity['id']): Promise<CodeEntity | null> {
    return this.codeRepository.findOneBy({
      id,
    });
  }

  getCodeTree(
    childId: CodeEntity['id'],
    parentId: CodeEntity['id'],
  ): Promise<CodeTreeEntity | null> {
    return this.codeTreeRepository.findOneBy({
      childId,
      parentId,
    });
  }

  getCodeTreeList(
    option: FindManyOptions<CodeTreeEntity>,
  ): Promise<CodeTreeEntity[]> {
    return this.codeTreeRepository.find(option);
  }

  getCodeList(option: FindManyOptions<CodeEntity>): Promise<CodeEntity[]> {
    return this.codeRepository.find(option);
  }

  saveCode(code: CodeEntity): Promise<CodeEntity> {
    return this.codeRepository.save(code);
  }

  saveCodeTree(codeTree: CodeTreeEntity): Promise<CodeTreeEntity> {
    return this.codeTreeRepository.save(codeTree);
  }
}
