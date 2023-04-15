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
import { RoleEntity, RoleGroupEntity } from '@modules/role/entity';
import { Logger } from '@nestjs/common';
import { InsertRoleGroupInput, UpdateRoleGroupInput } from '@modules/role/dto';
import { isNumber } from 'lodash';
import { RoleGroupRepository, RoleRepository } from '@modules/role/repository';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';

@Resolver(() => RoleGroupEntity)
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
