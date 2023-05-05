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
import { MenusOutput } from '@modules/menu/dto/output/menus.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { MenuRoleMapsInput } from '@modules/menu/dto/input/menu-role-maps.input';
import { MenuRoleMapOutput } from '@modules/menu/dto/output/entity/menu-role-map.output';
import { MenuRoleMapsOutput } from '@modules/menu/dto/output/menu-role-maps.output';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { UtilCommon } from '@common/util/Util.common';

@UseGuards(GqlAuthGuard)
@Resolver(() => MenuRoleMapOutput)
export class MenuByAuthResolver {
  private readonly logger = new Logger(MenuByAuthResolver.name);

  constructor(
    private readonly menuService: MenuService,
    private readonly menuRepository: MenuRepository,
    private readonly menuRoleMapRepository: MenuRoleMapRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => MenuRoleMapOutput)
  async menuRoleMap(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<MenuRoleMapOutput> {
    return await this.menuRoleMapRepository.findOneOrFail({
      where: {
        seqNo,
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

  @ResolveField(() => MenuOutput)
  async menu(@Parent() { menuSeqNo }: MenuRoleMapOutput): Promise<MenuOutput> {
    return await this.menuRepository.findOneOrFail({
      where: {
        seqNo: menuSeqNo,
      },
    });
  }

  @ResolveField(() => RoleOutput)
  async role(@Parent() { roleSeqNo }: MenuRoleMapOutput): Promise<MenuOutput> {
    return await this.roleRepository.findOneOrFail({
      where: {
        seqNo: roleSeqNo,
      },
    });
  }

  @ResolveField(() => MenuRoleMapOutput, {
    nullable: true,
  })
  async parent(
    @Parent() { parentSeqNo }: MenuRoleMapOutput,
  ): Promise<MenuRoleMapOutput | null> {
    return await UtilCommon.nilToNull(
      parentSeqNo,
      async (_) =>
        await this.menuRoleMapRepository.findOneBy({
          seqNo: _,
        }),
    );
  }
}
