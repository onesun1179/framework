import { Module } from '@nestjs/common';
import { PathController } from './path.controller';
import { PathService } from './path.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PathEntity } from './entity/path.entity';
import { PathsByAuthsEntity } from './entity/pathsByAuths.entity';
import { PathResolver } from './path.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PathEntity, PathsByAuthsEntity])],
  controllers: [PathController],
  providers: [PathService, PathResolver],
})
export class PathModule {}
