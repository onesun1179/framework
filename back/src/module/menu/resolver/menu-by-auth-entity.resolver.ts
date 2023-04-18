import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';
import { MenuService } from '@modules/menu/menu.service';
import { MenuEntityRepository } from '@modules/menu/repository/menu-entity.repository';
import { MenuRoleMapEntityRepository } from '@modules/menu/repository/menu-role-map-entity.repository';
import { RoleEntityRepository } from '@modules/role/repository/role-entity.repository';
import { MenuEntitiesOutput } from '@modules/menu/dto/output/menu-entities.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { MenuRoleMapEntitiesInput } from '@modules/menu/dto/input/menu-role-map-entities.input';
import { MenuRoleMapEntity } from '@modules/menu/dto/output/entity/menu-role-map.entity';
import { MenuRoleMapEntitiesOutput } from '@modules/menu/dto/output/menu-role-map-entities.output';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { isNil } from 'lodash';

@UseGuards(GqlAuthGuard)
@Resolver(() => MenuRoleMapEntity)
export class MenuByAuthEntityResolver {
  private readonly logger = new Logger(MenuByAuthEntityResolver.name);

  constructor(
    private readonly menuService: MenuService,
    private readonly menuRepository: MenuEntityRepository,
    private readonly menuRoleMapRepository: MenuRoleMapEntityRepository,
    private readonly roleRepository: RoleEntityRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => MenuRoleMapEntity)
  async menuRoleMapEntity(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<MenuRoleMapEntity> {
    return await this.menuRoleMapRepository.findOneOrFail({
      where: {
        seqNo,
      },
    });
  }

  @Query(() => MenuRoleMapEntitiesOutput)
  async menuRoleMapEntities(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('menuByAuthsInput', {
      type: () => MenuRoleMapEntitiesInput,
      nullable: true,
    })
    menuRoleMapsInput: MenuRoleMapEntitiesInput,
  ): Promise<MenuEntitiesOutput> {
    return await this.menuRoleMapRepository.paging(
      pagingInput,
      menuRoleMapsInput,
    );
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => MenuEntity)
  async menuEntity(
    @Parent() { menuSeqNo }: MenuRoleMapEntity,
  ): Promise<MenuEntity> {
    return await this.menuRepository.findOneOrFail({
      where: {
        seqNo: menuSeqNo,
      },
    });
  }

  @ResolveField(() => RoleEntity)
  async roleEntity(
    @Parent() { roleSeqNo }: MenuRoleMapEntity,
  ): Promise<MenuEntity> {
    return await this.roleRepository.findOneOrFail({
      where: {
        seqNo: roleSeqNo,
      },
    });
  }

  @ResolveField(() => MenuRoleMapEntity, {
    nullable: true,
  })
  async parent(
    @Parent() { parentSeqNo }: MenuRoleMapEntity,
  ): Promise<MenuRoleMapEntity | null> {
    if (isNil(parentSeqNo)) return null;
    return await this.menuRoleMapRepository.findOne({
      where: {
        seqNo: parentSeqNo,
      },
    });
  }

  // @Query(() => MenuEntitiesOutput)
  // async menus(
  //   @Args('pagingInput', {
  //     type: () => PagingInput,
  //     nullable: true,
  //   })
  //   pagingInput: PagingInput,
  //   @Args('menusInput', {
  //     type: () => MenuEntitiesInput,
  //     nullable: true,
  //   })
  //   menusInput: MenuEntitiesInput,
  // ): Promise<MenuEntitiesOutput> {
  //   return await this.menuRepository.paging(pagingInput, menusInput);
  // }
  //
  // @ResolveField(() => [MenuEntity])
  // async children(
  //   @Parent() { seqNo: parentSeqNo, roleSeqNo }: MenuByAuthOutput,
  //   @Args('menusInput', {
  //     type: () => MenuEntitiesInput,
  //     nullable: true,
  //   })
  //   menusInput: MenuEntitiesInput,
  // ): Promise<MenuEntity[]> {
  //   console.log({
  //     parentSeqNo,
  //     roleSeqNo,
  //   });
  //   return await this.menuRepository
  //     .createQueryBuilder('menu')
  //     .innerJoin(
  //       MenuRoleMapEntity,
  //       `child`,
  //       `
  //       child.parentSeqNo = :parentSeqNo AND
  //       child.roleSeqNo = :roleSeqNo AND
  //       menu.seqNo = child.menuSeqNo`,
  //       {
  //         parentSeqNo,
  //         roleSeqNo,
  //       },
  //     )
  //     .distinct()
  //     .getMany();
  // }
}
