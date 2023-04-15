import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { CodeEntity } from '@modules/code/entity/code.entity';
import { CodeMapEntity } from '@modules/code/entity/code-map.entity';
import { CodeRepository } from '@modules/code/repository/code.repository';
import { CodeMapRepository } from '@modules/code/repository/code-map.repository';
import { CodeService } from '@modules/code/code.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CodeEntity, CodeMapEntity]),
    TypeOrmExModule.forCustomRepository([CodeRepository, CodeMapRepository]),
  ],
  providers: [CodeService],
})
export class CodeModule {}
