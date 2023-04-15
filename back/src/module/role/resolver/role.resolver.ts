import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  RoleEntity,
  RoleFrontComponentMapEntity,
  RoleGroupEntity,
} from '@modules/role/entity';
import { MenuEntity } from '@modules/menu/entity';
import { RouteEntity } from '@modules/route/entity';
import { Logger } from '@nestjs/common';
import { RolesResolver } from '@modules/role/resolver';
import { InsertRoleInput, UpdateRoleInput } from '@modules/role/dto';
import { FrontComponentEntity } from '@modules/front-component/entity';
import {
  RoleGroupRepository,
  RoleRepository,
  RoleRouteMapRepository,
} from '@modules/role/repository';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants';
import { RouteRepository } from 'src/module/route/repository';
import { UserEntity } from '@modules/user/entity';
import { UserRepository } from '@modules/user/repository';

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
