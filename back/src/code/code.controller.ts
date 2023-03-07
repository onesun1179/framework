import { Controller } from '@nestjs/common';
import { Code } from './model/Code';
import { CodeService } from './code.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeTree } from './model/CodeTree';

@Controller({
  path: 'code',
  version: '1',
})
export class CodeController {
  constructor(
    private readonly codeService: CodeService,
    @InjectRepository(Code)
    private codeEntityRepository: Repository<Code>,
    @InjectRepository(CodeTree)
    private codeTreeEntityRepository: Repository<CodeTree>,
  ) {}
}
