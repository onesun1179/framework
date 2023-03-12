import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from './model/code';
import { CodeTree } from './model/code-tree';

@Module({
  imports: [TypeOrmModule.forFeature([Code, CodeTree])],
  controllers: [CodeController],
  providers: [CodeService],
})
export class CodeModule {}
