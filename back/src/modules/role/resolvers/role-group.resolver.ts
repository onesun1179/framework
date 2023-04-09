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
import { RoleGroup } from '../model/role-group';
import { Logger } from '@nestjs/common';
import { Role } from '../model/role';
import { SaveRoleGroupRequest } from '../model/request/save-role-group.request';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumber } from 'lodash';

@Resolver(() => RoleGroup)
export class RoleGroupResolver {
  constructor(
    private roleService: RoleService,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(RoleGroup)
    private roleGroupRepository: Repository<RoleGroup>,
  ) {}
  private readonly logger = new Logger(RoleGroupResolver.name);

  @Query(() => RoleGroup, {
    nullable: true,
  })
  async role(@Args('seqNo', { type: () => Int }) seqNo: RoleGroup['seqNo']) {
    return await RoleGroup.findOneBy({ seqNo });
  }

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

  @Mutation(() => RoleGroup)
  async saveRoleGroup(
    @Args('SaveRoleGroupRequest', {
      type: () => SaveRoleGroupRequest,
    })
    saveRoleGroupRequest: SaveRoleGroupRequest,
  ): Promise<RoleGroup> {
    const roleGroup = await RoleGroup.create({
      seqNo: saveRoleGroupRequest.seqNo,
      name: saveRoleGroupRequest.name,
      parentSeqNo: saveRoleGroupRequest.parentSeqNo,
    }).save();

    if (saveRoleGroupRequest.roleSeqNos.length > 0) {
      const a = await Role.update(
        {
          seqNo: In(saveRoleGroupRequest.roleSeqNos),
        },
        {
          roleGroup,
        },
      );
      this.logger.log(a);
    }

    if (saveRoleGroupRequest.childSeqNos.length > 0) {
      await RoleGroup.update(
        {
          seqNo: In(saveRoleGroupRequest.roleSeqNos),
        },
        {
          parent: roleGroup,
        },
      );
    }

    return roleGroup;
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
