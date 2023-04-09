import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Code } from '@modules/code/entities/code.entity';
import { Repository } from 'typeorm';
import { CodeMap } from '@modules/code/entities/code-map.entity';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private codeRepository: Repository<Code>,
    @InjectRepository(CodeMap)
    private codeTreeRepository: Repository<CodeMap>,
  ) {}

  getCodeRepository() {
    return this.codeRepository;
  }

  getCodeTreeRepository() {
    return this.codeTreeRepository;
  }
}
