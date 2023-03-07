import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RouteService } from '../route.service';
import { Route } from '../model/Route';
import { Logger } from '@nestjs/common';

@Resolver(() => Route)
export class RouteResolver {
  constructor(private routeService: RouteService) {}
  logger = new Logger(RouteResolver.name);

  @Query(() => Route)
  async route(
    @Args('id', {
      type: () => Int,
    })
    id: Route['id'],
  ) {
    return await this.routeService.getRouteById(id);
  }

  @ResolveField()
  children(@Parent() route: Route) {
    return Route.findOne({
      relations: {
        children: true,
      },
      where: {
        id: route.id,
      },
    }).then((r) => r.children);
  }

  @ResolveField()
  frontComponent(@Parent() route: Route) {
    return Route.findOne({
      relations: {
        frontComponent: true,
      },
      where: {
        id: route.id,
      },
    }).then((r) => r?.frontComponent);
  }

  @ResolveField()
  parent(@Parent() route: Route) {
    return Route.findOne({
      relations: {
        parent: true,
      },
      where: {
        id: route.id,
      },
    }).then((r) => r?.parent);
  }
}
