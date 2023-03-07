import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { RouteService } from '../route.service';
import { Route } from '../model/Route';

@Resolver(() => [Route])
export class RoutesResolver {
  constructor(private routeService: RouteService) {}
  @Query(() => [Route])
  async routes(
    @Args('id', {
      type: () => Int,
      nullable: true,
    })
    id?: Route['id'],
  ) {
    if (typeof id === 'undefined') {
      return this.routeService.getAllRouteList();
    } else {
      const parent = await this.routeService.getRouteById(id);
      return this.routeService.getChildrenByParent(parent);
    }
  }
}
