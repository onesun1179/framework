import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { AppConfigResolver } from './app-config.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './entity/AppConfig';

@Global()
@Module({
  exports: [AppConfigService],
  imports: [TypeOrmModule.forFeature([AppConfig])],
  providers: [AppConfigResolver, AppConfigService],
})
export class AppConfigModule {}
