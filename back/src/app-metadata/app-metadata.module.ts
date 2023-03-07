import { Global, Module } from '@nestjs/common';
import { AppMetadataService } from './app-metadata.service';
import { AppMetadataResolver } from './resolvers/app-metadata.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppMetadata } from './model/AppMetadata';

@Global()
@Module({
  exports: [AppMetadataService],
  imports: [TypeOrmModule.forFeature([AppMetadata])],
  providers: [AppMetadataResolver, AppMetadataService],
})
export class AppMetadataModule {}
