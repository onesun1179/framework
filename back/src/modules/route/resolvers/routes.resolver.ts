import { Query, Resolver } from '@nestjs/graphql';
import { RouteService } from '../route.service';
import { Route } from '../models/route';
import { DataSource } from 'typeorm';

@Resolver(() => [Route])
export class RoutesResolver {
  constructor(
    private routeService: RouteService,
    private dataSource: DataSource,
  ) {}
  @Query(() => [Route])
  async rootRoutes() {
    return await Route.find({
      where: {
        parentRouteRouteMap: [],
      },
    });
  }
}
