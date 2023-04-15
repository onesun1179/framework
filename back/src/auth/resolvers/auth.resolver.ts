import { Query } from '@nestjs/graphql';
import { CurrentUser } from '@common/decorator/CurrentUser';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';
import { AfterAT } from '@auth/interfaces/AfterAT';

export class AuthResolver {
  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async authCheck(@CurrentUser() user: AfterAT) {
    return !!user;
  }
}
