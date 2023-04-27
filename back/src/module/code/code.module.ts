import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { CodeOutput } from '@modules/code/dto/output/entity/code.output';
import { CodeMapOutput } from '@modules/code/dto/output/entity/code-map.output';
import { CodeRepository } from '@modules/code/repository/code.repository';
import { CodeMapRepository } from '@modules/code/repository/code-map.repository';
import { CodeService } from '@modules/code/code.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CodeOutput, CodeMapOutput]),
    TypeOrmExModule.forCustomRepository([CodeRepository, CodeMapRepository]),
  ],
  providers: [CodeService],
})
export class CodeModule {}
