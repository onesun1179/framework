import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Code } from './model/Code';
import { Repository } from 'typeorm';
import { CodeTree } from './model/CodeTree';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private codeRepository: Repository<Code>,
    @InjectRepository(CodeTree)
    private codeTreeRepository: Repository<CodeTree>,
  ) {}

  getCodeRepository() {
    return this.codeRepository;
  }

  getCodeTreeRepository() {
    return this.codeTreeRepository;
  }
}
