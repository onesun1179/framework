import { Module } from '@nestjs/common';
import { FrontComponentService } from './front-component.service';
import {
  AllFrontComponentResolver,
  FrontComponentResolver,
} from '@modules/front-component/resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AllFrontComponentEntity,
  FrontComponentEntity,
} from '@modules/front-component/entity';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import {
  AllFrontComponentRepository,
  FrontComponentRepository,
} from '@modules/front-component/repository';
import { RouteModule } from '../route/route.module';
import {
  RoleFrontComponentMapRepository,
  RoleRepository,
} from '@modules/role/repository';
import { RouteRepository } from '@modules/route/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([AllFrontComponentEntity, FrontComponentEntity]),
    TypeOrmExModule.forCustomRepository([
      AllFrontComponentRepository,
      FrontComponentRepository,
      RoleFrontComponentMapRepository,
      RoleRepository,
      RouteRepository,
    ]),
    RouteModule,
  ],
  providers: [
    FrontComponentResolver,
    AllFrontComponentResolver,
    FrontComponentService,
  ],
})
export class FrontComponentModule {}
