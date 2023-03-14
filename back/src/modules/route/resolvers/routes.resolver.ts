import { Query, Resolver } from '@nestjs/graphql';
import { RouteService } from '../route.service';
import { Route } from '../models/route';
import { DataSource, IsNull, Not } from 'typeorm';

@Resolver(() => [Route])
export class RoutesResolver {
  constructor(
    private routeService: RouteService,
    private dataSource: DataSource,
  ) {}
  @Query(() => [Route])
  async rootRoutes() {
    const a = await Route.find({
      relations: {
        parentRouteRouteMaps: true,
      },
      where: {
        parentRouteRouteMaps: {
          parentSeqNo: Not(IsNull()),
        },
      },
    });

    console.log(a);
    return a;
  }
}
