import { Module } from '@nestjs/common';
import { IconService } from './icon.service';
import { IconResolver } from './icon.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Icon } from './model/icon';
import { IconGroupTree } from './model/icon-group-tree';
import { IconGroup } from './model/icon-group';

@Module({
  imports: [TypeOrmModule.forFeature([Icon, IconGroupTree, IconGroup])],
  providers: [IconResolver, IconService],
})
export class IconModule {}
