import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IconOutput } from '@modules/icon/dto/output/entity/icon.output';
import { IconGroupTreeOutput } from '@modules/icon/dto/output/entity/icon-group-tree.output';
import { IconGroupOutput } from '@modules/icon/dto/output/entity/icon-group.output';
import { IconIconGroupMapOutput } from '@modules/icon/dto/output/entity/icon-icon-group-map.output';
import { IconService } from '@modules/icon/icon.service';
import { IconResolver } from '@modules/icon/resolver/icon.resolver';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { IconRepository } from '@modules/icon/repository/icon.repository';
import { MenuRepository } from '@modules/menu/repository/menu.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IconOutput,
      IconGroupTreeOutput,
      IconGroupOutput,
      IconIconGroupMapOutput,
    ]),
    TypeOrmExModule.forCustomRepository([IconRepository, MenuRepository]),
  ],
  providers: [IconResolver, IconService],
})
export class IconModule {}
