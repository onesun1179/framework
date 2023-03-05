import { Query, Resolver } from '@nestjs/graphql';
import { RouteService } from './route.service';
import { CurrentUser } from '../common/docorator/CurrentUser';
import { AccessToken } from '../auth/model/AccessToken';
import { Route } from './model/Route';

@Resolver()
export class RouteResolver {
  constructor(private routeService: RouteService) {}
  @Query(() => [Route])
  async pathList(@CurrentUser() user?: AccessToken) {
    return this.routeService.getPathList({ user });
  }
}
