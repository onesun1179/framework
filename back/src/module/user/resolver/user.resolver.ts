import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { UserEntity } from '@modules/user/entity/user.entity';
import { UserRepository } from '@modules/user/repository/user.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { RoleEntity } from '@modules/role/entity/role.entity';

@Resolver(() => UserEntity)
export class UserResolver {
  logger = new Logger(UserResolver.name);

  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => UserEntity)
  async user(
    @Args('id', {
      type: () => String,
    })
    id: UserEntity['id'],
  ) {
    return await UserEntity.findOneBy({
      id,
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => RoleEntity)
  async role(@Parent() { roleSeqNo }: UserEntity): Promise<RoleEntity> {
    return (await this.roleRepository
      .createQueryBuilder('r')
      .where(`r.seqNo = :seqNo`, {
        seqNo: roleSeqNo,
      })
      .getOne())!;
  }
}
