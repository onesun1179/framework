import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RoleService } from '../role.service';
import { RoleGroup } from '../entities/role-group.entity';
import { Logger } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { UpdateRoleGroupInput } from '../dto/update-role-group.input';
import { isNumber } from 'lodash';
import { RoleGroupRepository } from '@modules/role/repositories/role-group.repository';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { GqlError } from '@common/errors/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { InsertRoleGroupInput } from '@modules/role/dto/insert-role-group.input';

@Resolver(() => RoleGroup)
export class RoleGroupResolver {
  constructor(
    private roleService: RoleService,
    private roleRepository: RoleRepository,
    private roleGroupRepository: RoleGroupRepository,
  ) {}
  private readonly logger = new Logger(RoleGroupResolver.name);

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => RoleGroup, {
    nullable: true,
  })
  async role(@Args('seqNo', { type: () => Int }) seqNo: RoleGroup['seqNo']) {
    return await RoleGroup.findOneBy({ seqNo });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => [Role], {
    defaultValue: [],
  })
  async roles(@Parent() { seqNo }: RoleGroup): Promise<Array<Role>> {
    return this.roleRepository
      .createQueryBuilder('r')
      .innerJoin('r.roleGroup', 'rrg')
      .where(`rrg.seqNo = :seqNo`, {
        seqNo,
      })
      .distinct()
      .getMany();
  }

  @ResolveField(() => [RoleGroup], {
    defaultValue: [],
  })
  async children(@Parent() { seqNo }: RoleGroup): Promise<Array<RoleGroup>> {
    return this.roleGroupRepository
      .createQueryBuilder('rg')
      .where(`rg.parentSeqNo = :seqNo`, {
        seqNo,
      })
      .getMany();
  }

  @ResolveField(() => RoleGroup, {
    nullable: true,
  })
  async parent(
    @Parent() { parentSeqNo }: RoleGroup,
  ): Promise<RoleGroup | null> {
    if (isNumber(parentSeqNo)) {
      return this.roleGroupRepository
        .createQueryBuilder(`rg`)
        .where(`rg.seqNo = :seqNo`, {
          seqNo: parentSeqNo,
        })
        .getOne();
    } else {
      return null;
    }
  }
  /**************************************
   *           MUTATION
   ***************************************/

  @Mutation(() => RoleGroup)
  async insertRoleGroup(
    @Args('insertRoleGroupInput', {
      type: () => InsertRoleGroupInput,
    })
    insertRoleGroupInput: InsertRoleGroupInput,
  ): Promise<RoleGroup> {
    return await this.roleGroupRepository.saveCustom(insertRoleGroupInput);
  }

  @Mutation(() => RoleGroup)
  async updateRoleGroup(
    @Args('updateRoleGroupInput', {
      type: () => UpdateRoleGroupInput,
    })
    updateRoleGroupInput: UpdateRoleGroupInput,
  ): Promise<RoleGroup> {
    if (
      !(await this.roleGroupRepository.exist({
        where: {
          seqNo: updateRoleGroupInput.seqNo,
        },
      }))
    ) {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE());
    }
    return this.roleGroupRepository.saveCustom(updateRoleGroupInput);
  }

  @Mutation(() => RoleGroup)
  async removeRoleGroup(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<RoleGroup> {
    return await RoleGroup.findOneOrFail({
      where: {
        seqNo,
      },
    }).then((r) => r.remove());
  }
}
