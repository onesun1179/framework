import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { UserOutput } from '@modules/user/dto/output/entity/user.output';
import { UserRepository } from '@modules/user/repository/user.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';

@Resolver(() => UserOutput)
export class UserResolver {
  logger = new Logger(UserResolver.name);

  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => UserOutput)
  async user(
    @Args('id', {
      type: () => String,
    })
    id: string,
  ) {
    return await this.userRepository.findOneByOrFail({
      id,
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => RoleOutput)
  async role(@Parent() { roleSeqNo }: UserOutput): Promise<RoleOutput> {
    return await this.roleRepository.findOneByOrFail({
      seqNo: roleSeqNo,
    });
  }
}
