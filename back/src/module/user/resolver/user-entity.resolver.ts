import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { UserEntity } from '@modules/user/entity/user.entity';
import { UserEntityRepository } from '@modules/user/repository/user-entity.repository';
import { RoleEntityRepository } from '@modules/role/repository/role-entity.repository';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';

@Resolver(() => UserEntity)
export class UserEntityResolver {
  logger = new Logger(UserEntityResolver.name);

  constructor(
    private userRepository: UserEntityRepository,
    private roleRepository: RoleEntityRepository,
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
