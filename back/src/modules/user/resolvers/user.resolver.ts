import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { User } from '../models/user';
import { Role } from '@modules/role/entities/role.entity';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { UserRepository } from '@modules/user/repositories/user.repository';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
  ) {}
  logger = new Logger(UserResolver.name);

  /**************************************
   *              QUERY
   ***************************************/
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

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => Role)
  async role(@Parent() { roleSeqNo }: User): Promise<Role> {
    return (await this.roleRepository
      .createQueryBuilder('r')
      .where(`r.seqNo = :seqNo`, {
        seqNo: roleSeqNo,
      })
      .getOne())!;
  }
}
