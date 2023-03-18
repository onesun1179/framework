import { Query, Resolver } from '@nestjs/graphql';
import { RouteService } from '../route.service';
import { Route } from '../models/route';
import { DataSource } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../auth/guard/gql-auth.guard';
import { InjectDataSource } from '@nestjs/typeorm';
import { RouteRouteMap } from '@modules/route/models/route-route-map';

@UseGuards(GqlAuthGuard)
@Resolver(() => [Route])
export class RoutesResolver {
  constructor(
    private routeService: RouteService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  @Query(() => [Route])
  async rootRoutes() {
    return await this.dataSource
      .createQueryBuilder<Route>(Route, 'route')
      .andWhere(
        (qb) =>
          `route.seqNo not in (${qb
            .createQueryBuilder()
            .distinct()
            .select('routeRouteMap.childSeqNo')
            .from(RouteRouteMap, 'routeRouteMap')
            .getQuery()})`,
      )
      .getMany();
  }
}
