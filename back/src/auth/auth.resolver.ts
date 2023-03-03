import { Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './model/auth.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { CurrentUser } from '../common/docorator/CurrentUser';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => [Auth])
  @UseGuards(GqlAuthGuard)
  async getAuthList(@CurrentUser() user) {
    return await this.authService.getAuthList();
  }
}
