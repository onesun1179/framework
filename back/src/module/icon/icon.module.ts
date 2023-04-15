import { Module } from '@nestjs/common';
import { IconResolver, IconService } from '@modules/icon';
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
