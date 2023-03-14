import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Role } from '@modules/role/model/role';

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
    return await User.findOneBy({
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
