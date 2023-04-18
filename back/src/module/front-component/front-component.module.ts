import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { AllFrontComponentEntity } from '@modules/front-component/dto/output/entity/all-front-component.entity';
import { FrontComponentEntity } from '@modules/front-component/dto/output/entity/front-component.entity';
import { AllFrontComponentEntityRepository } from '@modules/front-component/repository/all-front-component-entity.repository';
import { FrontComponentEntityRepository } from '@modules/front-component/repository/front-component-entity.repository';
import { RoleFrontComponentMapEntityRepository } from '@modules/role/repository/role-front-component-map-entity.repository';
import { RoleEntityRepository } from '@modules/role/repository/role-entity.repository';
import { RouteEntityRepository } from '@modules/route/repository/route-entity.repository';
import { RouteModule } from '@modules/route/route.module';
import { FrontComponentEntityResolver } from '@modules/front-component/resolver/front-component-entity.resolver';
import { AllFrontComponentEntityResolver } from '@modules/front-component/resolver/all-front-component-entity.resolver';
import { FrontComponentService } from '@modules/front-component/front-component.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AllFrontComponentEntity, FrontComponentEntity]),
    TypeOrmExModule.forCustomRepository([
      AllFrontComponentEntityRepository,
      FrontComponentEntityRepository,
      RoleFrontComponentMapEntityRepository,
      RoleEntityRepository,
      RouteEntityRepository,
    ]),
    RouteModule,
  ],
  providers: [
    FrontComponentEntityResolver,
    AllFrontComponentEntityResolver,
    FrontComponentService,
  ],
})
export class FrontComponentModule {}
