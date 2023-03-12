import { Query, Resolver } from '@nestjs/graphql';
import { RouteService } from '../route.service';
import { Route } from '../models/Route';
import { DataSource } from 'typeorm';

@Resolver(() => [Route])
export class RoutesResolver {
  constructor(
    private routeService: RouteService,
    private dataSource: DataSource,
  ) {}
  @Query(() => [Route])
  async rootRoutes() {
    return await this.dataSource.manager.transaction(async (r) => {
      return await r.find(Route, {
        where: {
          parents: [],
        },
      });
    });
  }
}
