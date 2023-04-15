import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IconEntity } from '@modules/icon/entity/icon.entity';
import { IconGroupTreeEntity } from '@modules/icon/entity/icon-group-tree.entity';
import { IconGroupEntity } from '@modules/icon/entity/icon-group.entity';
import { IconIconGroupMapEntity } from '@modules/icon/entity/icon-icon-group-map.entity';
import { IconService } from '@modules/icon/icon.service';
import { IconResolver } from '@modules/icon/icon.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IconEntity,
      IconGroupTreeEntity,
      IconGroupEntity,
      IconIconGroupMapEntity,
    ]),
  ],
  providers: [IconResolver, IconService],
})
export class IconModule {}
