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
import { RoleGroupEntity } from '@modules/role/dto/output/entity/role-group.entity';
import { RoleService } from '@modules/role/role.service';
import { RoleEntityRepository } from '@modules/role/repository/role-entity.repository';
import { RoleGroupEntityRepository } from '@modules/role/repository/role-group-entity.repository';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { InsertRoleGroupEntityInput } from '@modules/role/dto/input/insert-role-group-entity.input';
import { UpdateRoleGroupEntityInput } from '@modules/role/dto/input/update-role-group-entity.input';
import { PagingInput } from '@common/dto/input/paging.input';
import { RoleGroupEntitiesOutput } from '@modules/role/dto/output/role-group-entities.output';
import { RoleGroupEntitiesInput } from '@modules/role/dto/input/role-group-entities.input';

@Resolver(() => RoleGroupEntity)
export class RoleGroupEntityResolver {
  private readonly logger = new Logger(RoleGroupEntityResolver.name);

  constructor(
    private roleService: RoleService,
    private roleRepository: RoleEntityRepository,
    private roleGroupRepository: RoleGroupEntityRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => RoleGroupEntitiesOutput)
  async roleGroupEntities(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('roleGroupEntitiesInput', {
      type: () => RoleGroupEntitiesInput,
      nullable: true,
    })
    roleGroupEntitiesInput: RoleGroupEntitiesInput,
  ): Promise<RoleGroupEntitiesOutput> {
    return await this.roleGroupRepository.paging(
      pagingInput,
      roleGroupEntitiesInput,
    );
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
      type: () => InsertRoleGroupEntityInput,
    })
    insertRoleGroupInput: InsertRoleGroupEntityInput,
  ): Promise<RoleGroupEntity> {
    return await this.roleGroupRepository.saveCustom(insertRoleGroupInput);
  }

  @Mutation(() => RoleGroupEntity)
  async updateRoleGroup(
    @Args('updateRoleGroupInput', {
      type: () => UpdateRoleGroupEntityInput,
    })
    updateRoleGroupInput: UpdateRoleGroupEntityInput,
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
