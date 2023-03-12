import { Module } from '@nestjs/common';
import { FrontComponentService } from './front-component.service';
import { FrontComponentResolver } from './resolvers/front-component.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontComponent } from './model/front-component';
import { FrontComponentType } from './model/front-component-type';
import { FrontComponentTypeResolver } from '@modules/front-component/resolvers/front-component-type.resolver';
import { AllFrontComponentResolver } from '@modules/front-component/resolvers/all-front-component.resolver';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';

@Module({
  exports: [FrontComponentService],
  imports: [
    TypeOrmModule.forFeature([
      AllFrontComponent,
      FrontComponent,
      FrontComponentType,
    ]),
  ],
  providers: [
    FrontComponentResolver,
    FrontComponentTypeResolver,
    AllFrontComponentResolver,
    FrontComponentService,
  ],
})
export class FrontComponentModule {}
