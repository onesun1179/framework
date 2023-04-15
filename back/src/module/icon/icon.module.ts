import { Module } from '@nestjs/common';
import { IconService } from './icon.service';
import { IconResolver } from './icon.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  IconEntity,
  IconGroupEntity,
  IconGroupTreeEntity,
  IconIconGroupMapEntity,
} from '@modules/icon/entity';

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
