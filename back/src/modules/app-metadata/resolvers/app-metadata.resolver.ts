import { Args, Query, Resolver } from '@nestjs/graphql';
import { AppMetadataService } from '../app-metadata.service';
import { AppMetadata } from '../model/AppMetadata';

@Resolver(() => AppMetadata)
export class AppMetadataResolver {
  constructor(private readonly appMetadataService: AppMetadataService) {}

  @Query(() => AppMetadata)
  appMetaData(
    @Args('name', { type: () => String }) name: AppMetadata['name'],
  ): Promise<AppMetadata> {
    return this.appMetadataService.getAppMetaDataByName(name);
  }
}
