import { Module } from '@nestjs/common';
import { FrontComponentService } from './front-component.service';
import { FrontComponentResolver } from './front-component.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontComponent } from './model/FrontComponent';
import { FrontComponentType } from './model/FrontComponentType';

@Module({
  imports: [TypeOrmModule.forFeature([FrontComponent, FrontComponentType])],
  providers: [FrontComponentResolver, FrontComponentService],
})
export class FrontComponentModule {}
