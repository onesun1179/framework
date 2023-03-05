import { Resolver } from '@nestjs/graphql';
import { FrontComponentService } from './front-component.service';

@Resolver()
export class FrontComponentResolver {
  constructor(private readonly frontRouteService: FrontComponentService) {}
}
