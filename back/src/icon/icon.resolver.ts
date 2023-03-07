import { Resolver } from '@nestjs/graphql';
import { IconService } from './icon.service';

@Resolver()
export class IconResolver {
  constructor(private readonly iconService: IconService) {}
}
