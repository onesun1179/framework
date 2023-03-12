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
import { Route } from '../models/Route';
import { Logger } from '@nestjs/common';
import { FrontComponent } from '../../front-component/model/FrontComponent';
import { UtilField } from '@util/Util.field';
import { Role } from '../../role/model/Role';
import { InsertRouteRequest } from '../models/request/InsertRoute.request';
import { UpdateRouteRequest } from '@modules/route/models/request/UpdateRoute.request';
import { RouteRouteMap } from '@modules/route/models/RouteRouteMap';

@Resolver(() => Route)
export class RouteResolver {
  constructor(private routeService: RouteService) {}
  logger = new Logger(RouteResolver.name);

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

  @ResolveField(() => FrontComponent, {
    nullable: true,
  })
  frontComponent(
    @Parent() { frontComponentSeqNo }: Route,
  ): Promise<FrontComponent | null> {
    if (frontComponentSeqNo) {
      return FrontComponent.findOneBy({
        seqNo: frontComponentSeqNo,
      });
    }
    return null;
  }

  @ResolveField(() => [Route], {
    description: UtilField.getFieldComment('child', 's'),
    defaultValue: [],
  })
  async children(@Parent() { seqNo }: Route): Promise<Route[]> {
    return await RouteRouteMap.find({
      relations: {
        childRoute: true,
      },
      select: ['childRoute'],
      where: {
        parentSeqNo: seqNo,
      },
    }).then((r) => r?.map((o) => o.childRoute));
  }

  @ResolveField(() => [Route], {
    description: UtilField.getFieldComment('parent', 's'),
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

  @ResolveField(() => [Role], {
    description: UtilField.getFieldComment('role', 's'),
    defaultValue: [],
  })
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

  @Mutation(() => Route, {
    description: UtilField.getFieldComment('route', 'insert'),
  })
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

  @Mutation(() => Route, {
    description: UtilField.getFieldComment('route', 'update'),
  })
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
