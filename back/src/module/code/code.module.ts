import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { CodeEntity } from '@modules/code/dto/output/entity/code.entity';
import { CodeMapEntity } from '@modules/code/dto/output/entity/code-map.entity';
import { CodeEntityRepository } from '@modules/code/repository/code-entity.repository';
import { CodeMapEntityRepository } from '@modules/code/repository/code-map-entity.repository';
import { CodeService } from '@modules/code/code.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CodeEntity, CodeMapEntity]),
    TypeOrmExModule.forCustomRepository([
      CodeEntityRepository,
      CodeMapEntityRepository,
    ]),
  ],
  providers: [CodeService],
})
export class CodeModule {}
