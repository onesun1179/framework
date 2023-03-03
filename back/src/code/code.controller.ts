import { Controller, Get } from '@nestjs/common';
import { CodeEntity } from './entity/code.entity';
import { CodeService } from './code.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeTreeEntity } from './entity/codeTree.entity';

@Controller({
  path: 'code',
  version: '1',
})
export class CodeController {
  constructor(
    private readonly codeService: CodeService,
    @InjectRepository(CodeEntity)
    private codeEntityRepository: Repository<CodeEntity>,
    @InjectRepository(CodeTreeEntity)
    private codeTreeEntityRepository: Repository<CodeTreeEntity>,
  ) {}

  @Get('getCode')
  async getCode(): Promise<CodeEntity[]> {
    return await this.codeService.getCodeList({});
  }

  @Get('saveCode')
  async saveCode(): Promise<CodeTreeEntity> {
    const c = new CodeEntity();
    c.name = 'test';
    await this.codeEntityRepository.save(c);
    const b = new CodeEntity();
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
