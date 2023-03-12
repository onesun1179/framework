import { Resolver } from '@nestjs/graphql';
import { FrontComponentService } from '../front-component.service';
import { FrontComponent } from '@modules/front-component/model/FrontComponent';

@Resolver(() => FrontComponent)
export class FrontComponentResolver {
  constructor(private readonly frontRouteService: FrontComponentService) {}
}
