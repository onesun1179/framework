import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Role } from '../entities/role.entity';
import { RoleGroup } from '../entities/role-group.entity';
import { Menu } from '@modules/menu/model/menu';
import { Route } from '@modules/route/dto/route';
import { Logger } from '@nestjs/common';
import { RolesResolver } from './roles.resolver';
import { InsertRoleInput } from '../dto/insert-role.input';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { RoleFrontComponentMap } from '@modules/role/entities/role-front-component-map.entity';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { UpdateRoleInput } from '@modules/role/dto/update-role.input';
import { GqlError } from '@common/errors/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { RoleRouteMapRepository } from '@modules/role/repositories/role-route-map.repository';
import { RouteRepository } from '@modules/route/repositories/route.repository';
import { RoleGroupRepository } from '@modules/role/repositories/role-group.repository';
import { User } from '@modules/user/models/user';
import { UserRepository } from '@modules/user/repositories/user.repository';

@Resolver(() => Role)
export class RoleResolver {
  constructor(
    private roleRepository: RoleRepository,
    private userRepository: UserRepository,
    private routeRepository: RouteRepository,
    private roleGroupRepository: RoleGroupRepository,
    private roleRouteMapRepository: RoleRouteMapRepository,
  ) {}
  private readonly logger = new Logger(RolesResolver.name);

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => Role, {
    nullable: true,
  })
  async role(@Args('seqNo', { type: () => Int }) seqNo: Role['seqNo']) {
    return await Role.findOneBy({ seqNo });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => RoleGroup, {
    nullable: true,
  })
  async roleGroup(
    @Parent() { roleGroupSeqNo }: Role,
  ): Promise<RoleGroup | null> {
    if (!roleGroupSeqNo) {
      return null;
    }
    return await this.roleGroupRepository
      .createQueryBuilder('rg')
      .where(`rg.seqNo = :roleGroupSeqNo`, {
        roleGroupSeqNo,
      })
      .getOneOrFail();
  }

  @ResolveField(() => [User])
  async users(@Parent() { seqNo }: Role): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('u')
      .where(`u.roleSeqNo = seqNo`, {
        seqNo,
      })
      .getMany();
  }

  @ResolveField(() => [Menu])
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

  @ResolveField(() => [Route])
  async routes(@Parent() { seqNo }: Role): Promise<Route[]> {
    return await this.routeRepository
      .createQueryBuilder('r')
      .innerJoin(`r.roleRouteMaps`, `rrm`)
      .where(`rrm.roleSeqNo = roleSeqNo`, {
        roleSeqNo: seqNo,
      })
      .getMany();
  }

  @ResolveField(() => [FrontComponent])
  async frontComponents(
    @Parent() { seqNo }: Role,
  ): Promise<Array<FrontComponent>> {
    return await RoleFrontComponentMap.find({
      select: ['frontComponent'],
      relations: {
        frontComponent: true,
      },
      where: {
        roleSeqNo: seqNo,
      },
    }).then((r) => r?.map((o) => o.frontComponent));
  }

  /**************************************
   *           MUTATION
   ***************************************/

  @Mutation(() => Role)
  async insertRole(
    @Args('insertRoleInput', {
      type: () => InsertRoleInput,
    })
    insertRoleInput: InsertRoleInput,
  ): Promise<Role> {
    return await this.roleRepository.saveCustom(insertRoleInput);
  }

  @Mutation(() => Role)
  async updateRole(
    @Args('updateRoleInput', {
      type: () => UpdateRoleInput,
    })
    updateRoleInput: UpdateRoleInput,
  ): Promise<Role> {
    if (
      !(await this.roleRepository.exist({
        where: {
          seqNo: updateRoleInput.seqNo,
        },
      }))
    ) {
      throw new GqlError(MessageConstant.NONE_KEY());
    }
    return await this.roleRepository.saveCustom(updateRoleInput);
  }
}
