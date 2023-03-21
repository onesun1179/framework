import { Args, Query, Resolver } from '@nestjs/graphql';
import { RouteService } from '../route.service';
import { Route } from '../models/route';
import { DataSource } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../auth/guard/gql-auth.guard';
import { InjectDataSource } from '@nestjs/typeorm';

@UseGuards(GqlAuthGuard)
@Resolver(() => [Route])
export class RoutesResolver {
  constructor(
    private routeService: RouteService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => [Route])
  async routes(
    @Args('rootYn', {
      type: () => Boolean,
      defaultValue: false,
    })
    rootYn = false,
  ) {
    if (rootYn) {
      return await this.dataSource
        .createQueryBuilder<Route>(Route, 'route')
        .where(`route.parentSeqNo is null`)
        .getMany();
    } else {
      return await this.dataSource
        .createQueryBuilder<Route>(Route, 'route')
        .getMany();
    }
  }
  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
}
