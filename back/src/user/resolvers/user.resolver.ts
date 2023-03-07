import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { User } from '../models/User';
import { UserService } from '../user.service';
import { Auth } from '../../auth/model/Auth';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}
  logger = new Logger(UserResolver.name);

  @Query(() => User)
  async user(
    @Args('id')
    id: User['id'],
  ) {
    return await this.userService.getUserRepository().findOneBy({
      id,
    });
  }

  @ResolveField()
  async auth(@Parent() user: User): Promise<Auth> {
    return await this.userService
      .getUserRepository()
      .findOne({
        select: ['auth'],
        relations: {
          auth: true,
        },
        where: {
          id: user.id,
        },
      })
      .then((r) => r.auth);
  }
}
