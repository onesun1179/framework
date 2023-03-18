import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RouteService } from '../route.service';
import { Route } from '../models/route';
import { Logger } from '@nestjs/common';
import { FrontComponent } from '@modules/front-component/model/front-component';
import { Role } from '@modules/role/model/role';
import { InsertRouteRequest } from '../models/request/insert-route.request';
import { UpdateRouteRequest } from '@modules/route/models/request/update-route.request';
import { RouteRouteMap } from '@modules/route/models/route-route-map';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Resolver(() => Route)
export class RouteResolver {
  constructor(
    private routeService: RouteService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  logger = new Logger(RouteResolver.name);

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => Route)
  async route(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: Route['seqNo'],
  ) {
    return await Route.findOneBy({
      seqNo,
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => FrontComponent, {
    nullable: true,
  })
  frontComponent(
    @Parent() { frontComponentId }: Route,
  ): Promise<FrontComponent | null> {
    if (frontComponentId) {
      return FrontComponent.findOneBy({
        id: frontComponentId,
      });
    }
    return null;
  }

  @ResolveField(() => [Route], {
    defaultValue: [],
  })
  async children(@Parent() { seqNo }: Route): Promise<Route[]> {
    return await this.dataSource
      .createQueryBuilder<Route>(Route, 'route')
      .innerJoin(
        'route.parentRouteRouteMaps',
        'parentRouteRouteMaps',
        'parentRouteRouteMaps.parentSeqNo = :seqNo',
        {
          seqNo,
        },
      )
      .getMany();
  }

  @ResolveField(() => [Route], {
    defaultValue: [],
  })
  async parents(@Parent() { seqNo }: Route): Promise<Route[]> {
    return await RouteRouteMap.find({
      relations: {
        parentRoute: true,
      },
      select: ['parentRoute'],
      where: {
        childSeqNo: seqNo,
      },
    }).then((r) => r?.map((o) => o.parentRoute));
  }

  @ResolveField(() => [Role])
  async roles(@Parent() { seqNo }: Route): Promise<Role[]> {
    return await Route.findOne({
      select: ['roleRouteMaps'],
      relations: {
        roleRouteMaps: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.roleRouteMaps.map((o) => o.role));
  }

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => Route)
  async insertRoute(
    @Args('insertRouteRequest', {
      type: () => InsertRouteRequest,
    })
    insertRouteRequest: InsertRouteRequest,
  ): Promise<Route> {
    console.log({
      ...insertRouteRequest,
    });
    return await this.routeService.saveRoute(insertRouteRequest);
  }

  @Mutation(() => Route)
  async updateRoute(
    @Args('updateRouteRequest', {
      type: () => UpdateRouteRequest,
    })
    updateRouteRequest: UpdateRouteRequest,
  ): Promise<Route> {
    if (
      (await Route.countBy({
        seqNo: updateRouteRequest.seqNo,
      })) === 0
    ) {
      throw new Error();
    }
    return await this.routeService.saveRoute(updateRouteRequest);
  }
}
