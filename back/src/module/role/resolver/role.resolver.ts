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
import { RoleEntity } from '../entity/role.entity';
import { RoleRepository } from '../repository/role.repository';
import { RolesResolver } from './roles.resolver';
import { UserRepository } from '@modules/user/repository/user.repository';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { RoleGroupRepository } from '@modules/role/repository/role-group.repository';
import { RoleRouteMapRepository } from '@modules/role/repository/role-route-map.repository';
import { RoleGroupEntity } from '@modules/role/entity/role-group.entity';
import { UserEntity } from '@modules/user/entity/user.entity';
import { MenuEntity } from '@modules/menu/entity/menu.entity';
import { RouteEntity } from '@modules/route/entity/route.entity';
import { FrontComponentEntity } from '@modules/front-component/entity/front-component.entity';
import { RoleFrontComponentMapEntity } from '@modules/role/entity/role-front-component-map.entity';
import { InsertRoleInput } from '@modules/role/dto/insert-role.input';
import { UpdateRoleInput } from '@modules/role/dto/update-role.input';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';

@Resolver(() => RoleEntity)
export class RoleResolver {
  private readonly logger = new Logger(RolesResolver.name);

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
  @Query(() => RoleEntity, {
    nullable: true,
  })
  async role(@Args('seqNo', { type: () => Int }) seqNo: RoleEntity['seqNo']) {
    return await RoleEntity.findOneBy({ seqNo });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => RoleGroupEntity, {
    nullable: true,
  })
  async roleGroup(
    @Parent() { roleGroupSeqNo }: RoleEntity,
  ): Promise<RoleGroupEntity | null> {
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

  @ResolveField(() => [UserEntity])
  async users(@Parent() { seqNo }: RoleEntity): Promise<UserEntity[]> {
    return await this.userRepository
      .createQueryBuilder('u')
      .where(`u.roleSeqNo = seqNo`, {
        seqNo,
      })
      .getMany();
  }

  @ResolveField(() => [MenuEntity])
  async menus(@Parent() { seqNo }: RoleEntity) {
    return await RoleEntity.findOne({
      select: ['menuRoleMaps'],
      relations: {
        menuRoleMaps: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.menuRoleMaps.map((o) => o.menu));
  }

  @ResolveField(() => [RouteEntity])
  async routes(@Parent() { seqNo }: RoleEntity): Promise<RouteEntity[]> {
    return await this.routeRepository
      .createQueryBuilder('r')
      .innerJoin(`r.roleRouteMaps`, `rrm`)
      .where(`rrm.roleSeqNo = roleSeqNo`, {
        roleSeqNo: seqNo,
      })
      .getMany();
  }

  @ResolveField(() => [FrontComponentEntity])
  async frontComponents(
    @Parent() { seqNo }: RoleEntity,
  ): Promise<Array<FrontComponentEntity>> {
    return await RoleFrontComponentMapEntity.find({
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

  @Mutation(() => RoleEntity)
  async insertRole(
    @Args('insertRoleInput', {
      type: () => InsertRoleInput,
    })
    insertRoleInput: InsertRoleInput,
  ): Promise<RoleEntity> {
    return await this.roleRepository.saveCustom(insertRoleInput);
  }

  @Mutation(() => RoleEntity)
  async updateRole(
    @Args('updateRoleInput', {
      type: () => UpdateRoleInput,
    })
    updateRoleInput: UpdateRoleInput,
  ): Promise<RoleEntity> {
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
