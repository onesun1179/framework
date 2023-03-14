import { Query, Resolver } from '@nestjs/graphql';
import { RouteService } from '../route.service';
import { Route } from '../models/route';
import { DataSource, IsNull } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../auth/guard/gql-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => [Route])
export class RoutesResolver {
  constructor(
    private routeService: RouteService,
    private dataSource: DataSource,
  ) {}
  @Query(() => [Route])
  async rootRoutes() {
    return await Route.find({
      relations: {
        parentRouteRouteMaps: true,
      },
      where: {
        parentRouteRouteMaps: {
          parentSeqNo: IsNull(),
        },
      },
    });
  }
}
