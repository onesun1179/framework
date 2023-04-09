import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from '@modules/code/entities/code.entity';
import { CodeMap } from '@modules/code/entities/code-map.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Code, CodeMap])],
  providers: [CodeService],
})
export class CodeModule {}
