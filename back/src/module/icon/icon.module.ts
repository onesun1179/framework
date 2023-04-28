import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IconOutput } from '@modules/icon/dto/output/entity/icon.output';
import { IconLabelOutput } from '@modules/icon/dto/output/entity/icon-label.output';
import { IconService } from '@modules/icon/icon.service';
import { IconResolver } from '@modules/icon/resolver/icon.resolver';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { IconRepository } from '@modules/icon/repository/icon.repository';
import { MenuRepository } from '@modules/menu/repository/menu.repository';
import { IconsIconLabelsOutput } from '@modules/icon/dto/output/entity/icons-icon-labels.output';
import { IconLabelRepository } from '@modules/icon/repository/icon-label.repository';
import { IconsIconLabelsRepository } from '@modules/icon/repository/icons-icon-labels.repository';
import { IconLabelResolver } from '@modules/icon/resolver/icon-label.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IconOutput,
      IconLabelOutput,
      IconsIconLabelsOutput,
    ]),
    TypeOrmExModule.forCustomRepository([
      IconRepository,
      IconLabelRepository,
      IconsIconLabelsRepository,
      MenuRepository,
    ]),
  ],
  providers: [IconResolver, IconService, IconLabelResolver],
})
export class IconModule {}
