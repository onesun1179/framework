import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RouteService } from '../route.service';
import { Route } from '../models/Route';
import { Logger } from '@nestjs/common';
import { FrontComponent } from '../../front-component/model/FrontComponent';

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
    return await this.routeService.getRouteRepository().findOneBy({
      seqNo,
    });
  }

  @ResolveField(() => [Route], {
    defaultValue: [],
  })
  children(@Parent() { seqNo }: Route) {
    return this.routeService
      .getRouteRepository()
      .findOne({
        select: ['children'],
        relations: {
          children: true,
        },
        where: {
          seqNo,
        },
      })
      .then((r) => r.children);
  }

  @ResolveField(() => FrontComponent, {
    nullable: true,
  })
  frontComponent(@Parent() { seqNo }: Route) {
    return this.routeService
      .getRouteRepository()
      .findOne({
        select: ['frontComponent'],
        relations: {
          frontComponent: true,
        },
        where: {
          seqNo,
        },
      })
      .then((r) => r?.frontComponent);
  }

  @ResolveField(() => [Route], {
    defaultValue: [],
  })
  parents(@Parent() { seqNo }: Route) {
    return this.routeService
      .getRouteRepository()
      .findOne({
        select: ['parents'],
        relations: {
          parents: true,
        },
        where: {
          seqNo,
        },
      })
      .then((r) => r?.parents);
  }

  @ResolveField(() => Boolean)
  leafYn(@Parent() { seqNo, children }: Route) {
    if (children) {
      return children.length === 0;
    } else {
      return this.routeService
        .getRouteRepository()
        .findOne({
          select: ['children'],
          relations: {
            children: true,
          },
          where: {
            seqNo,
          },
        })
        .then((r) => r?.children.length === 0);
    }
  }
}
