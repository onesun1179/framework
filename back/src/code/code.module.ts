import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeEntity } from './entity/code.entity';
import { CodeTreeEntity } from './entity/codeTree.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CodeEntity, CodeTreeEntity])],
  controllers: [CodeController],
  providers: [CodeService],
})
export class CodeModule {}
