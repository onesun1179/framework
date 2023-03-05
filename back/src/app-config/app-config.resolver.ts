import { Resolver } from '@nestjs/graphql';
import { AppConfigService } from './app-config.service';

@Resolver()
export class AppConfigResolver {
  constructor(private readonly configService: AppConfigService) {}
}
