import { Module } from '@nestjs/common';
import { FrontComponentService } from './front-component.service';
import { FrontComponentResolver } from './resolvers/front-component.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontComponent } from './model/FrontComponent';
import { FrontComponentType } from './model/FrontComponentType';

@Module({
  exports: [FrontComponentService],
  imports: [TypeOrmModule.forFeature([FrontComponent, FrontComponentType])],
  providers: [FrontComponentResolver, FrontComponentService],
})
export class FrontComponentModule {}
