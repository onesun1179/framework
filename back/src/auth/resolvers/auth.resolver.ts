import { Query } from '@nestjs/graphql';
import { CurrentUser } from '@common/docorator/CurrentUser';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guard/gql-auth.guard';
import { AfterAT } from '../interfaces/AfterAT';

export class AuthResolver {
  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async authCheck(@CurrentUser() user: AfterAT) {
    return !!user;
  }
}
