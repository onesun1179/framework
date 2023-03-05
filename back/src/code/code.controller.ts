import { Controller, Get } from '@nestjs/common';
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

  @Get('getCode')
  async getCode(): Promise<Code[]> {
    return await this.codeService.getCodeList({});
  }

  @Get('saveCode')
  async saveCode(): Promise<CodeTree> {
    const c = new Code();
    c.name = 'test';
    await this.codeEntityRepository.save(c);
    const b = new Code();
    b.name = 'test2';
    await this.codeEntityRepository.save(b);
    await this.codeTreeEntityRepository.save({
      childId: c.id,
      parentId: b.id,
      name: 'dkdk',
    });

    return await this.codeTreeEntityRepository.findOneBy({
      childId: c.id,
      parentId: b.id,
    });
  }
}
