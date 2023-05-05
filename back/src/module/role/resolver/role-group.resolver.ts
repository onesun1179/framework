import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { isNumber } from 'lodash';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { RoleGroupOutput } from '@modules/role/dto/output/entity/role-group.output';
import { RoleService } from '@modules/role/role.service';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { RoleGroupRepository } from '@modules/role/repository/role-group.repository';
import { InsertRoleGroupInput } from '@modules/role/dto/input/insert-role-group.input';
import { UpdateRoleGroupInput } from '@modules/role/dto/input/update-role-group.input';
import { PagingInput } from '@common/dto/input/paging.input';
import { RoleGroupsOutput } from '@modules/role/dto/output/role-groups.output';
import { RoleGroupsInput } from '@modules/role/dto/input/role-groups.input';
import { RolesInput } from '@modules/role/dto/input/roles.input';
import { RolesOutput } from '@modules/role/dto/output/roles.output';

@Resolver(() => RoleGroupOutput)
export class RoleGroupResolver {
  private readonly logger = new Logger(RoleGroupResolver.name);

  constructor(
    private roleService: RoleService,
    private roleRepository: RoleRepository,
    private roleGroupRepository: RoleGroupRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => RoleGroupsOutput)
  async roleGroups(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('roleGroupsInput', {
      type: () => RoleGroupsInput,
      nullable: true,
    })
    roleGroupsInput: RoleGroupsInput,
  ): Promise<RoleGroupsOutput> {
    return await this.roleService.roleGroups(pagingInput, roleGroupsInput);
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => RolesOutput)
  async roles(
    @Parent() { seqNo }: RoleGroupOutput,
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('rolesInput', {
      type: () => RolesInput,
      nullable: true,
    })
    rolesInput: RolesInput,
  ): Promise<RolesOutput> {
    return await this.roleService.roles(
      pagingInput,
      rolesInput,
      this.roleRepository
        .createQueryBuilder('rr')
        .where(`rr.role_group_seq_no = :roleGroupSeqNo`, {
          roleGroupSeqNo: seqNo,
        }),
    );
  }

  @ResolveField(() => RoleGroupsOutput)
  async children(
    @Parent() { seqNo }: RoleGroupOutput,
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('roleGroupsInput', {
      type: () => RoleGroupsInput,
      nullable: true,
    })
    roleGroupsInput: RoleGroupsInput,
  ): Promise<RoleGroupsOutput> {
    return this.roleService.roleGroups(
      pagingInput,
      roleGroupsInput,
      this.roleGroupRepository
        .createQueryBuilder('rg')
        .where(`rg.parentSeqNo = :seqNo`, {
          seqNo,
        }),
    );
  }

  @ResolveField(() => RoleGroupOutput, {
    nullable: true,
  })
  async parent(
    @Parent() { parentSeqNo }: RoleGroupOutput,
  ): Promise<RoleGroupOutput | null> {
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

  @Mutation(() => RoleGroupOutput)
  async insertRoleGroup(
    @Args('insertRoleGroupInput', {
      type: () => InsertRoleGroupInput,
    })
    insertRoleGroupInput: InsertRoleGroupInput,
  ): Promise<RoleGroupOutput> {
    return await this.roleGroupRepository.saveCustom(insertRoleGroupInput);
  }

  @Mutation(() => RoleGroupOutput)
  async updateRoleGroup(
    @Args('updateRoleGroupInput', {
      type: () => UpdateRoleGroupInput,
    })
    updateRoleGroupInput: UpdateRoleGroupInput,
  ): Promise<RoleGroupOutput> {
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

  @Mutation(() => RoleGroupOutput)
  async removeRoleGroup(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<RoleGroupOutput> {
    return await RoleGroupOutput.findOneOrFail({
      where: {
        seqNo,
      },
    }).then((r) => r.remove());
  }
}
