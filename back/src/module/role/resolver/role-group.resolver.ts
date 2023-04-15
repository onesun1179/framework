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
import { RoleGroupEntity } from '@modules/role/entity/role-group.entity';
import { RoleService } from '@modules/role/role.service';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { RoleGroupRepository } from '@modules/role/repository/role-group.repository';
import { RoleEntity } from '@modules/role/entity/role.entity';
import { InsertRoleGroupInput } from '@modules/role/dto/insert-role-group.input';
import { UpdateRoleGroupInput } from '@modules/role/dto/update-role-group.input';

@Resolver(() => RoleGroupEntity)
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
  @Query(() => RoleGroupEntity, {
    nullable: true,
  })
  async role(
    @Args('seqNo', { type: () => Int }) seqNo: RoleGroupEntity['seqNo'],
  ) {
    return await RoleGroupEntity.findOneBy({ seqNo });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => [RoleEntity], {
    defaultValue: [],
  })
  async roles(
    @Parent() { seqNo }: RoleGroupEntity,
  ): Promise<Array<RoleEntity>> {
    return this.roleRepository
      .createQueryBuilder('r')
      .innerJoin('r.roleGroup', 'rrg')
      .where(`rrg.seqNo = :seqNo`, {
        seqNo,
      })
      .distinct()
      .getMany();
  }

  @ResolveField(() => [RoleGroupEntity], {
    defaultValue: [],
  })
  async children(
    @Parent() { seqNo }: RoleGroupEntity,
  ): Promise<Array<RoleGroupEntity>> {
    return this.roleGroupRepository
      .createQueryBuilder('rg')
      .where(`rg.parentSeqNo = :seqNo`, {
        seqNo,
      })
      .getMany();
  }

  @ResolveField(() => RoleGroupEntity, {
    nullable: true,
  })
  async parent(
    @Parent() { parentSeqNo }: RoleGroupEntity,
  ): Promise<RoleGroupEntity | null> {
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

  @Mutation(() => RoleGroupEntity)
  async insertRoleGroup(
    @Args('insertRoleGroupInput', {
      type: () => InsertRoleGroupInput,
    })
    insertRoleGroupInput: InsertRoleGroupInput,
  ): Promise<RoleGroupEntity> {
    return await this.roleGroupRepository.saveCustom(insertRoleGroupInput);
  }

  @Mutation(() => RoleGroupEntity)
  async updateRoleGroup(
    @Args('updateRoleGroupInput', {
      type: () => UpdateRoleGroupInput,
    })
    updateRoleGroupInput: UpdateRoleGroupInput,
  ): Promise<RoleGroupEntity> {
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

  @Mutation(() => RoleGroupEntity)
  async removeRoleGroup(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<RoleGroupEntity> {
    return await RoleGroupEntity.findOneOrFail({
      where: {
        seqNo,
      },
    }).then((r) => r.remove());
  }
}
