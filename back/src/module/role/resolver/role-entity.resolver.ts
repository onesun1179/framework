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
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { RoleEntityRepository } from '../repository/role-entity.repository';
import { RoleEntitiesResolver } from './role-entities.resolver';
import { UserEntityRepository } from '@modules/user/repository/user-entity.repository';
import { RouteEntityRepository } from '@modules/route/repository/route-entity.repository';
import { RoleGroupEntityRepository } from '@modules/role/repository/role-group-entity.repository';
import { RoleRouteMapEntityRepository } from '@modules/role/repository/role-route-map-entity.repository';
import { RoleGroupEntity } from '@modules/role/dto/output/entity/role-group.entity';
import { UserEntity } from '@modules/user/entity/user.entity';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { RouteEntity } from '@modules/route/dto/output/entity/route.entity';
import { FrontComponentEntity } from '@modules/front-component/dto/output/entity/front-component.entity';
import { RoleFrontComponentMapEntity } from '@modules/role/dto/output/entity/role-front-component-map.entity';
import { InsertRoleEntityInput } from '@modules/role/dto/input/insert-role-entity.input';
import { UpdateRoleEntityInput } from '@modules/role/dto/input/update-role-entity.input';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';

@Resolver(() => RoleEntity)
export class RoleEntityResolver {
  private readonly logger = new Logger(RoleEntitiesResolver.name);

  constructor(
    private roleRepository: RoleEntityRepository,
    private userRepository: UserEntityRepository,
    private routeRepository: RouteEntityRepository,
    private roleGroupRepository: RoleGroupEntityRepository,
    private roleRouteMapRepository: RoleRouteMapEntityRepository,
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
      type: () => InsertRoleEntityInput,
    })
    insertRoleInput: InsertRoleEntityInput,
  ): Promise<RoleEntity> {
    return await this.roleRepository.saveCustom(insertRoleInput);
  }

  @Mutation(() => RoleEntity)
  async updateRole(
    @Args('updateRoleInput', {
      type: () => UpdateRoleEntityInput,
    })
    updateRoleInput: UpdateRoleEntityInput,
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
