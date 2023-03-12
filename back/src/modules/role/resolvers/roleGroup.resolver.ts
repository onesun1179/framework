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
import { RoleGroup } from '../model/RoleGroup';
import { Logger } from '@nestjs/common';
import { Role } from '../model/Role';
import { SaveRoleGroupRequest } from '../model/request/SaveRoleGroup.request';
import { In } from 'typeorm';
import { UtilField } from '@util/Util.field';

@Resolver(() => RoleGroup)
export class RoleGroupResolver {
  constructor(private roleService: RoleService) {}
  private readonly logger = new Logger(RoleGroupResolver.name);

  @Query(() => RoleGroup, {
    nullable: true,
  })
  async role(@Args('seqNo', { type: () => Int }) seqNo: RoleGroup['seqNo']) {
    return await RoleGroup.findOneBy({ seqNo });
  }

  @ResolveField(() => [Role], {
    description: UtilField.getFieldComment('role', 's'),
    defaultValue: [],
  })
  async roles(@Parent() { seqNo }: RoleGroup): Promise<Array<Role>> {
    return await RoleGroup.findOne({
      select: ['roles'],
      relations: {
        roles: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.roles);
  }

  @ResolveField(() => [RoleGroup], {
    description: UtilField.getFieldComment('child', 's'),
    defaultValue: [],
  })
  async children(@Parent() { seqNo }: RoleGroup): Promise<Array<RoleGroup>> {
    return RoleGroup.findOne({
      select: ['children'],
      relations: {
        children: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.children);
  }

  @ResolveField(() => RoleGroup, {
    description: UtilField.getFieldComment('parent'),
    nullable: true,
  })
  async parent(@Parent() { seqNo }: RoleGroup): Promise<RoleGroup | null> {
    return RoleGroup.findOne({
      select: ['parent'],
      relations: {
        parent: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.parent);
  }

  @Mutation(() => RoleGroup, {
    description: UtilField.getFieldComment('role', 'group', 'save'),
  })
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

  @Mutation(() => RoleGroup, {
    description: UtilField.getFieldComment('role', 'group', 'delete'),
  })
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
