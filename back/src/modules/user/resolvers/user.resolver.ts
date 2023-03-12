import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { User } from '../models/User';
import { UserService } from '../user.service';
import { Role } from '../../role/model/Role';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}
  logger = new Logger(UserResolver.name);

  @Query(() => User)
  async user(
    @Args('id', {
      type: () => String,
    })
    id: User['id'],
  ) {
    return await this.userService.getUserRepository().findOneBy({
      id,
    });
  }

  @ResolveField(() => Role)
  async role(@Parent() user: User): Promise<Role> {
    return await User.findOne({
      select: ['role'],
      relations: {
        role: true,
      },
      where: {
        id: user.id,
      },
    }).then((r) => r.role);
  }
}
