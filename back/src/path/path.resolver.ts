import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { PathService } from './path.service';
import { CurrentUser } from '../common/docorator/CurrentUser';
import { AccessToken } from '../auth/model/accessToken.model';
import { Path } from './model/path.model';

@Resolver()
export class PathResolver {
  constructor(private pathService: PathService) {}
  @Query(() => [Path])
  @UseGuards(GqlAuthGuard)
  async pathList(@CurrentUser() user: AccessToken) {
    return this.pathService.getPathList({ user });
  }
}
