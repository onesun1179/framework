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
import { Role } from '../model/Role';
import { RoleGroup } from '../model/RoleGroup';
import { User } from '../../user/models/User';
import { Menu } from '../../menu/model/Menu';
import { Route } from '../../route/models/Route';
import { Logger } from '@nestjs/common';
import { RolesResolver } from './roles.resolver';
import { InsertRoleIn } from '../model/request/insertRole.in';
import { UtilField } from '@util/Util.field';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private roleService: RoleService) {}
  private readonly logger = new Logger(RolesResolver.name);
  @Query(() => Role, {
    nullable: true,
  })
  async role(@Args('seqNo', { type: () => Int }) seqNo: Role['seqNo']) {
    return await Role.findOneBy({ seqNo });
  }
  @ResolveField(() => RoleGroup)
  async roleGroup(@Parent() { seqNo }: Role) {
    return await Role.findOne({
      select: ['roleGroup'],
      relations: {
        roleGroup: true,
      },
      where: {
        seqNo,
      },
    });
  }

  @ResolveField(() => [User], {
    description: UtilField.getFieldComment('user', 's'),
  })
  async users(@Parent() { seqNo }: Role): Promise<User[]> {
    return await Role.findOne({
      select: ['users'],
      relations: {
        users: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.users);
  }

  @ResolveField(() => [Menu], {
    description: UtilField.getFieldComment('menu', 's'),
  })
  async menus(@Parent() { seqNo }: Role) {
    return await Role.findOne({
      select: ['menuRoleMaps'],
      relations: {
        menuRoleMaps: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.menuRoleMaps.map((o) => o.menu));
  }

  @ResolveField(() => [Route], {
    description: UtilField.getFieldComment('route', 's'),
  })
  async routes(@Parent() { seqNo }: Role): Promise<Route[]> {
    return await Role.findOne({
      select: ['roleRouteMaps'],
      relations: {
        roleRouteMaps: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r.roleRouteMaps.map((o) => o.route));
  }

  @Mutation(() => Role, {
    nullable: true,
  })
  insertRole(
    @Args('role', {
      type: () => InsertRoleIn,
    })
    insertRoleIn: InsertRoleIn,
  ) {
    // return this.roleService.getRoleRepository().save(role);
  }
}
