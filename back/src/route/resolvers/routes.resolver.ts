import { Query, Resolver } from '@nestjs/graphql';
import { RouteService } from '../route.service';
import { Route } from '../models/Route';

@Resolver(() => [Route])
export class RoutesResolver {
  constructor(private routeService: RouteService) {}
  @Query(() => [Route])
  async rootRoutes() {
    return this.routeService.getRouteRepository().find({
      where: {
        parents: [],
      },
    });
  }
}
