import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { AllFrontComponentOutput } from '@modules/front-component/dto/output/entity/all-front-component.output';
import { FrontComponentOutput } from '@modules/front-component/dto/output/entity/front-component.output';
import { AllFrontComponentRepository } from '@modules/front-component/repository/all-front-component.repository';
import { FrontComponentRepository } from '@modules/front-component/repository/front-component.repository';
import { RoleFrontComponentMapRepository } from '@modules/role/repository/role-front-component-map.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { RouteModule } from '@modules/route/route.module';
import { FrontComponentResolver } from '@modules/front-component/resolver/front-component.resolver';
import { AllFrontComponentResolver } from '@modules/front-component/resolver/all-front-component.resolver';
import { FrontComponentService } from '@modules/front-component/front-component.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AllFrontComponentOutput, FrontComponentOutput]),
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
