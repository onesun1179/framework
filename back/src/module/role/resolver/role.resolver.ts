import { Logger } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { RoleRepository } from '../repository/role.repository';
import { UserRepository } from '@modules/user/repository/user.repository';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { RoleGroupRepository } from '@modules/role/repository/role-group.repository';
import { RoleRouteMapRepository } from '@modules/role/repository/role-route-map.repository';
import { RoleGroupOutput } from '@modules/role/dto/output/entity/role-group.output';
import { UserOutput } from '@modules/user/dto/output/entity/user.output';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';
import { FrontComponentOutput } from '@modules/front-component/dto/output/entity/front-component.output';
import { RoleFrontComponentMapOutput } from '@modules/role/dto/output/entity/role-front-component-map.output';
import { InsertRoleInput } from '@modules/role/dto/input/insert-role.input';
import { UpdateRoleInput } from '@modules/role/dto/input/update-role.input';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { PagingInput } from '@common/dto/input/paging.input';
import { RolesOutput } from '@modules/role/dto/output/roles.output';
import { RolesInput } from '@modules/role/dto/input/roles.input';

@Resolver(() => RoleOutput)
export class RoleResolver {
  private readonly logger = new Logger(RoleResolver.name);

  constructor(
    private roleRepository: RoleRepository,
    private userRepository: UserRepository,
    private routeRepository: RouteRepository,
    private roleGroupRepository: RoleGroupRepository,
    private roleRouteMapRepository: RoleRouteMapRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => RoleOutput, {
    nullable: true,
  })
  async role(@Args('seqNo', { type: () => Int }) seqNo: RoleOutput['seqNo']) {
    return await RoleOutput.findOneBy({ seqNo });
  }

  @Query(() => RolesOutput)
  async roles(
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
    return await this.roleRepository.paging(pagingInput, rolesInput);
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => RoleGroupOutput, {
    nullable: true,
  })
  async roleGroup(
    @Parent() { roleGroupSeqNo }: RoleOutput,
  ): Promise<RoleGroupOutput | null> {
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

  @ResolveField(() => [UserOutput])
  async users(@Parent() { seqNo }: RoleOutput): Promise<UserOutput[]> {
    return await this.userRepository
      .createQueryBuilder('u')
      .where(`u.roleSeqNo = seqNo`, {
        seqNo,
      })
      .getMany();
  }

  @ResolveField(() => [MenuOutput])
  async menus(@Parent() { seqNo }: RoleOutput) {
    return await RoleOutput.findOne({
      select: ['menuRoleMaps'],
      relations: {
        menuRoleMaps: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.menuRoleMaps.map((o) => o.menu));
  }

  @ResolveField(() => [RouteOutput])
  async routes(@Parent() { seqNo }: RoleOutput): Promise<RouteOutput[]> {
    return await this.routeRepository
      .createQueryBuilder('r')
      .innerJoin(`r.roleRouteMaps`, `rrm`)
      .where(`rrm.roleSeqNo = roleSeqNo`, {
        roleSeqNo: seqNo,
      })
      .getMany();
  }

  @ResolveField(() => [FrontComponentOutput])
  async frontComponents(
    @Parent() { seqNo }: RoleOutput,
  ): Promise<Array<FrontComponentOutput>> {
    return await RoleFrontComponentMapOutput.find({
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

  @Mutation(() => RoleOutput)
  async insertRole(
    @Args('insertRoleInput', {
      type: () => InsertRoleInput,
    })
    insertRoleInput: InsertRoleInput,
  ): Promise<RoleOutput> {
    return await this.roleRepository.saveCustom(insertRoleInput);
  }

  @Mutation(() => RoleOutput)
  async updateRole(
    @Args('updateRoleInput', {
      type: () => UpdateRoleInput,
    })
    updateRoleInput: UpdateRoleInput,
  ): Promise<RoleOutput> {
    if (
      !(await this.roleRepository.exist({
        where: {
          seqNo: updateRoleInput.seqNo,
        },
      }))
    ) {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE());
    }
    return await this.roleRepository.saveCustom(updateRoleInput);
  }
}
