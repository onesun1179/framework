import { Injectable } from '@nestjs/common';
import { CodeMapRepository, CodeRepository } from '@modules/code/repository';

@Injectable()
export class CodeService {
  constructor(
    private codeRepository: CodeRepository,
    private codeMapRepository: CodeMapRepository,
  ) {}

  getCodeRepository() {
    return this.codeRepository;
  }

  getCodeTreeRepository() {
    return this.codeMapRepository;
  }
}
