import { Injectable } from '@nestjs/common';
import { CodeRepository } from '@modules/code/repositories/code.repository';
import { CodeMapRepository } from '@modules/code/repositories/code-map.repository';

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
