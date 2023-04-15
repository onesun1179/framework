import { Module } from '@nestjs/common';
import { CodeService } from '@modules/code';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeEntity, CodeMapEntity } from '@modules/code/entity';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { CodeMapRepository, CodeRepository } from '@modules/code/repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CodeEntity, CodeMapEntity]),
    TypeOrmExModule.forCustomRepository([CodeRepository, CodeMapRepository]),
  ],
  providers: [CodeService],
})
export class CodeModule {}
