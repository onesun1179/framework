import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from '@modules/code/entities/code.entity';
import { CodeMap } from '@modules/code/entities/code-map.entity';
import { TypeOrmExModule } from '@common/modules/TypeOrmExModule';
import { CodeRepository } from '@modules/code/repositories/code.repository';
import { CodeMapRepository } from '@modules/code/repositories/code-map.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Code, CodeMap]),
    TypeOrmExModule.forCustomRepository([CodeRepository, CodeMapRepository]),
  ],
  providers: [CodeService],
})
export class CodeModule {}
