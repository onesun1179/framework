import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IconEntity } from '@modules/icon/dto/output/entity/icon.entity';
import { IconGroupTreeEntity } from '@modules/icon/dto/output/entity/icon-group-tree.entity';
import { IconGroupEntity } from '@modules/icon/dto/output/entity/icon-group.entity';
import { IconIconGroupMapEntity } from '@modules/icon/dto/output/entity/icon-icon-group-map.entity';
import { IconService } from '@modules/icon/icon.service';
import { IconEntityResolver } from '@modules/icon/resolver/icon-entity.resolver';
import { IconResolver } from '@modules/icon/resolver/icon.resolver';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { IconEntityRepository } from '@modules/icon/repository/icon-entity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IconEntity,
      IconGroupTreeEntity,
      IconGroupEntity,
      IconIconGroupMapEntity,
    ]),
    TypeOrmExModule.forCustomRepository([IconEntityRepository]),
  ],
  providers: [IconEntityResolver, IconService, IconResolver],
})
export class IconModule {}
