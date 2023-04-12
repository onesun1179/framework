import { Module } from '@nestjs/common';
import { FrontComponentService } from './front-component.service';
import { FrontComponentResolver } from './resolvers/front-component.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontComponent } from './entities/front-component.entity';
import { AllFrontComponentResolver } from '@modules/front-component/resolvers/all-front-component.resolver';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';
import { TypeOrmExModule } from '@common/modules/TypeOrmExModule';
import { AllFrontComponentRepository } from '@modules/front-component/repositories/all-front-component.repository';
import { FrontComponentRepository } from '@modules/front-component/repositories/front-component.repository';
import { RouteModule } from '@modules/route/route.module';
import { RoleFrontComponentMapRepository } from '@modules/role/repositories/role-front-component-map.repository';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { RouteRepository } from '@modules/route/repositories/route.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AllFrontComponent, FrontComponent]),
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
