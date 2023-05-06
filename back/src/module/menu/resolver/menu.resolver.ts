import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';
import { MenuService } from '@modules/menu/menu.service';
import { MenuRepository } from '@modules/menu/repository/menu.repository';
import { MenusOutput } from '@modules/menu/dto/output/menus.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { MenusInput } from '@modules/menu/dto/input/menus.input';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { IconOutput } from '@modules/icon/dto/output/entity/icon.output';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { MenuRoleMapRepository } from '@modules/menu/repository/menu-role-map.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { IconRepository } from '@modules/icon/repository/icon.repository';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { MenuRoleMapEntity } from '@modules/menu/dto/output/entity/menu-role-map.entity';
import { InsertMenuInput } from '@modules/menu/dto/input/insert-menu.input';
import { UpdateMenuInput } from '@modules/menu/dto/input/update-menu.input';
import { UtilCommon } from '@common/util/Util.common';

@UseGuards(GqlAuthGuard)
@Resolver(() => MenuEntity)
export class MenuResolver {
  private readonly logger = new Logger(MenuResolver.name);

  constructor(
    private readonly menuService: MenuService,
    private readonly menuRepository: MenuRepository,
    private readonly menuRoleMapRepository: MenuRoleMapRepository,
    private readonly roleRepository: RoleRepository,
    private readonly iconEntityRepository: IconRepository,
    private readonly routeRepository: RouteRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => MenuEntity)
  async menu(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ) {
    return await this.menuRepository.findOneOrFail({
      where: {
        seqNo,
      },
    });
  }

  @Query(() => MenusOutput)
  async menus(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('menusInput', {
      type: () => MenusInput,
      nullable: true,
    })
    menusInput: MenusInput,
  ): Promise<MenusOutput> {
    return await this.menuService.menus(pagingInput, menusInput);
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => [RoleOutput])
  async roles(@Parent() { seqNo }: MenuEntity): Promise<Array<RoleOutput>> {
    return await this.roleRepository
      .createQueryBuilder(`r`)
      .innerJoin(`r.menuRoleMaps`, `mrm`)
      .where(`mrm.menuSeqNo = :menuSeqNo`, {
        menuSeqNo: seqNo,
      })
      .getMany();
  }

  @ResolveField(() => IconOutput, {
    nullable: true,
  })
  async icon(@Parent() { iconSeqNo }: MenuEntity): Promise<IconOutput | null> {
    return UtilCommon.nilToNull(
      iconSeqNo,
      async (iconSeqNo) =>
        await this.iconEntityRepository
          .createQueryBuilder(`i`)
          .where(`i.seq_no = :iconSeqNo`, {
            iconSeqNo,
          })
          .getOne(),
    );
  }

  @ResolveField(() => RouteOutput, {
    nullable: true,
  })
  async route(
    @Parent() { routeSeqNo }: MenuEntity,
  ): Promise<RouteOutput | null> {
    return UtilCommon.nilToNull(
      routeSeqNo,
      async (routeSeqNo) =>
        await this.routeRepository
          .createQueryBuilder(`r`)
          .where(`r.seq_no = :routeSeqNo`, {
            routeSeqNo,
          })
          .getOne(),
    );
  }

  @ResolveField(() => MenusOutput)
  async children(
    @Parent() { seqNo: menuSeqNo }: MenuEntity,
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('menusInput', {
      type: () => MenusInput,
      nullable: true,
    })
    menusInput: MenusInput,
  ): Promise<MenusOutput> {
    return this.menuService.menus(
      pagingInput,
      menusInput,
      this.menuRepository
        .createQueryBuilder('menu')
        .innerJoin(
          MenuRoleMapEntity,
          `child`,
          `
      child.menuSeqNo = menu.seq_no
      `,
        )
        .innerJoin(
          MenuRoleMapEntity,
          `parent`,
          `
      parent.menu_seq_no = :parentMenuSeqNo AND
      child.parent_seq_no = parent.seq_no
      `,
          {
            parentMenuSeqNo: menuSeqNo,
          },
        ),
    );
  }

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => MenuEntity)
  async insertMenu(
    @Args('insertMenuInput', {
      type: () => InsertMenuInput,
    })
    insertMenuInput: InsertMenuInput,
  ): Promise<MenuEntity> {
    return await this.menuRepository.saveCustom(insertMenuInput);
  }

  @Mutation(() => MenuEntity)
  async updateMenu(
    @Args('updateMenuInput', {
      type: () => UpdateMenuInput,
    })
    updateMenuInput: UpdateMenuInput,
  ): Promise<MenuEntity> {
    return await this.menuRepository.saveCustom(updateMenuInput);
  }
}
