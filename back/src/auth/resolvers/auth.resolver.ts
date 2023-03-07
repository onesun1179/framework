import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { Auth } from '../model/Auth';
import { AuthGroup } from '../model/AuthGroup';
import { User } from '../../user/models/User';
import { Menu } from '../../menu/model/Menu';
import { Route } from '../../route/models/Route';
import { Logger } from '@nestjs/common';
import { AuthsResolver } from './auths.resolver';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private authService: AuthService) {}
  private readonly logger = new Logger(AuthsResolver.name);
  @Query(() => Auth, {
    nullable: true,
  })
  async auth(@Args('seqNo', { type: () => Int }) seqNo: Auth['seqNo']) {
    return await this.authService.getAuthRepository().findOneBy({ seqNo });
  }
  @ResolveField(() => AuthGroup)
  async authGroup(@Parent() { seqNo }: Auth) {
    return this.authService.getAuthRepository().findOne({
      select: ['authGroup'],
      relations: {
        authGroup: true,
      },
      where: {
        seqNo,
      },
    });
  }

  @ResolveField(() => [User], {
    description: '사용자 목록',
    defaultValue: [],
  })
  async users(@Parent() { seqNo }: Auth) {
    return this.authService.getAuthRepository().findOne({
      select: ['users'],
      relations: {
        users: true,
      },
      where: {
        seqNo,
      },
    });
  }

  @ResolveField(() => [Menu], {
    description: '메뉴 목록',
  })
  async menus(@Parent() { seqNo }: Auth) {
    return await this.authService
      .getAuthRepository()
      .findOne({
        select: ['menusAuths'],
        relations: {
          menusAuths: true,
        },
        where: {
          seqNo,
        },
      })
      .then((r) => r?.menusAuths.map((o) => o.menu));
  }

  @ResolveField(() => [Route], {
    description: '경로 목록',
  })
  routes(@Parent() { seqNo }: Auth): Promise<Route[]> {
    return this.authService
      .getAuthRepository()
      .findOne({
        select: ['routesAuths'],
        relations: {
          routesAuths: true,
        },
        where: {
          seqNo,
        },
      })
      .then((r) => r.routesAuths.map((o) => o.route));
  }
}
