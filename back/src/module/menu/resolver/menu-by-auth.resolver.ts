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
import { MenuRepository } from '@modules/menu/repository/menu.repository';
import { MenuRoleMapRepository } from '@modules/menu/repository/menu-role-map.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { MenusOutput } from '@modules/menu/dto/output/menus.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { MenuRoleMapsInput } from '@modules/menu/dto/input/menu-role-maps.input';
import { MenuRoleMapEntity } from '@modules/menu/entity/menu-role-map.entity';
import { MenuRoleMapsOutput } from '@modules/menu/dto/output/menu-role-maps.output';
import { MenuEntity } from '@modules/menu/entity/menu.entity';
import { RoleEntity } from '@modules/role/entity/role.entity';
import { isNil } from 'lodash';

@UseGuards(GqlAuthGuard)
@Resolver(() => MenuRoleMapEntity)
export class MenuByAuthResolver {
  private readonly logger = new Logger(MenuByAuthResolver.name);

  constructor(
    private readonly menuService: MenuService,
    private readonly menuRepository: MenuRepository,

    private readonly menuRoleMapRepository: MenuRoleMapRepository,
    private readonly roleRepository: RoleRepository,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => MenuRoleMapEntity)
  async menuRoleMap(
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

  @Query(() => MenuRoleMapEntity)
  async menuByAuthByMenuAndRole(
    @Args('menuSeqNo', {
      type: () => Int,
    })
    menuSeqNo: number,
    @Args('roleSeqNo', {
      type: () => Int,
    })
    roleSeqNo: number,
  ): Promise<MenuRoleMapEntity> {
    return await this.menuRoleMapRepository.findOneOrFail({
      where: {
        menuSeqNo,
        roleSeqNo,
      },
    });
  }

  @Query(() => MenuRoleMapsOutput)
  async menuRoleMaps(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('menuByAuthsInput', {
      type: () => MenuRoleMapsInput,
      nullable: true,
    })
    menuRoleMapsInput: MenuRoleMapsInput,
  ): Promise<MenusOutput> {
    return await this.menuRoleMapRepository.paging(
      pagingInput,
      menuRoleMapsInput,
    );
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => MenuEntity)
  async menu(@Parent() { menuSeqNo }: MenuRoleMapEntity): Promise<MenuEntity> {
    return await this.menuRepository.findOneOrFail({
      where: {
        seqNo: menuSeqNo,
      },
    });
  }

  @ResolveField(() => RoleEntity)
  async role(@Parent() { roleSeqNo }: MenuRoleMapEntity): Promise<MenuEntity> {
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
  // @Query(() => MenusOutput)
  // async menus(
  //   @Args('pagingInput', {
  //     type: () => PagingInput,
  //     nullable: true,
  //   })
  //   pagingInput: PagingInput,
  //   @Args('menusInput', {
  //     type: () => MenusInput,
  //     nullable: true,
  //   })
  //   menusInput: MenusInput,
  // ): Promise<MenusOutput> {
  //   return await this.menuRepository.paging(pagingInput, menusInput);
  // }
  //
  // @ResolveField(() => [MenuEntity])
  // async children(
  //   @Parent() { seqNo: parentSeqNo, roleSeqNo }: MenuByAuthOutput,
  //   @Args('menusInput', {
  //     type: () => MenusInput,
  //     nullable: true,
  //   })
  //   menusInput: MenusInput,
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
