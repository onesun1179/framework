import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from './entity/menu.entity';
import { MenuTreeEntity } from './entity/menuTree.entity';
import { MenusByAuthsEntity } from './entity/menusByAuths.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuEntity, MenuTreeEntity, MenusByAuthsEntity]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
