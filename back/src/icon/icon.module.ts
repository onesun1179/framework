import { Module } from '@nestjs/common';
import { IconService } from './icon.service';
import { IconResolver } from './icon.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Icon } from './model/Icon';
import { IconGroupTree } from './model/IconGroupTree';
import { IconGroup } from './model/IconGroup';

@Module({
  imports: [TypeOrmModule.forFeature([Icon, IconGroupTree, IconGroup])],
  providers: [IconResolver, IconService],
})
export class IconModule {}
