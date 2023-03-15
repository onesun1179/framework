import { Module } from '@nestjs/common';
import { IconService } from './icon.service';
import { IconResolver } from './icon.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Icon } from './model/icon';
import { IconGroupTree } from './model/icon-group-tree';
import { IconGroup } from './model/icon-group';
import { IconIconGroupMap } from '@modules/icon/model/icon-icon-group-map';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Icon,
      IconGroupTree,
      IconGroup,
      IconIconGroupMap,
    ]),
  ],
  providers: [IconResolver, IconService],
})
export class IconModule {}
