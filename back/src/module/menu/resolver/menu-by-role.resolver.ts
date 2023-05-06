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
import { MenuRoleMapRepository } from '@modules/menu/repository/menu-role-map.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { IconRepository } from '@modules/icon/repository/icon.repository';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { MenuByRoleOutput } from '@modules/menu/dto/output/menu-by-role.output';
import { CurrentUser } from '@common/decorator/CurrentUser';
import { AfterAT } from '@auth/interfaces/AfterAT';
import { IsNull } from 'typeorm';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { InsertMenuRoleMapInput } from '@modules/menu/dto/input/insert-menu-role-map.input';
import { UpdateMenuRoleMapInput } from '@modules/menu/dto/input/update-menu-role-map.input';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { RearrangementMenuInput } from '@modules/menu/dto/input/rearrangement-menu.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => MenuByRoleOutput)
export class MenuByRoleResolver {
  private readonly logger = new Logger(MenuByRoleResolver.name);

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
  @Query(() => MenuByRoleOutput)
  async menuByRole(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<MenuByRoleOutput> {
    return await this.menuRoleMapRepository
      .findOneOrFail({
        relations: {
          menu: true,
        },
        where: {
          seqNo,
        },
      })
      .then((r) => MenuByRoleOutput.toThis(r));
  }

  @Query(() => [MenuByRoleOutput])
  async menusByRole(
    @Args('roleSeqNo', {
      type: () => Int,
    })
    roleSeqNo: number,
  ): Promise<Array<MenuByRoleOutput>> {
    return await this.menuRoleMapRepository
      .createQueryBuilder('mrm')
      .setFindOptions({
        where: {
          roleSeqNo,
          parentSeqNo: IsNull(),
        },
        order: {
          orderNo: 'ASC',
        },
      })
      .getMany()
      .then((r) => r.map(MenuByRoleOutput.toThis));
  }

  @Query(() => [MenuByRoleOutput])
  async menusByCurr(
    @CurrentUser() { roleSeqNo }: AfterAT,
  ): Promise<Array<MenuByRoleOutput>> {
    return await this.menuRoleMapRepository
      .createQueryBuilder('mrm')
      .setFindOptions({
        where: {
          roleSeqNo,
          parentSeqNo: IsNull(),
        },
        order: {
          orderNo: 'ASC',
        },
      })
      .getMany()
      .then((r) => r.map(MenuByRoleOutput.toThis));
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => [MenuByRoleOutput])
  async children(
    @Parent() { seqNo: parentSeqNo }: MenuByRoleOutput,
  ): Promise<Array<MenuByRoleOutput>> {
    return await this.menuRoleMapRepository
      .createQueryBuilder('mrm')
      .setFindOptions({
        where: {
          parentSeqNo,
        },
        order: {
          orderNo: 'ASC',
        },
      })
      .getMany()
      .then((r) => r.map(MenuByRoleOutput.toThis));
  }

  @ResolveField(() => MenuEntity)
  async menu(@Parent() { menu, menuSeqNo }: MenuByRoleOutput) {
    return (
      menu ||
      (await this.menuRepository.findOneBy({
        seqNo: menuSeqNo,
      }))
    );
  }
  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => MenuByRoleOutput)
  async insertMenuByRole(
    @Args('insertMenuRoleMapInput', {
      type: () => InsertMenuRoleMapInput,
    })
    insertMenuRoleMapInput: InsertMenuRoleMapInput,
  ): Promise<MenuByRoleOutput> {
    return MenuByRoleOutput.toThis(
      await this.menuService.saveMenuRoleMap(insertMenuRoleMapInput),
    );
  }
  @Mutation(() => MenuByRoleOutput)
  async updateMenuByRole(
    @Args('updateMenuRoleMapInput', {
      type: () => UpdateMenuRoleMapInput,
    })
    updateMenuRoleMapInput: UpdateMenuRoleMapInput,
  ): Promise<MenuByRoleOutput> {
    if (await this.menuService.hasMenuRoleMap(updateMenuRoleMapInput.seqNo)) {
      return MenuByRoleOutput.toThis(
        await this.menuService.saveMenuRoleMap(updateMenuRoleMapInput),
      );
    } else {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
    }
  }
  @Mutation(() => MenuByRoleOutput)
  async rearrangementMenu(
    @Args('rearrangementMenuInput', {
      type: () => RearrangementMenuInput,
    })
    rearrangementMenuInput: RearrangementMenuInput,
  ): Promise<MenuByRoleOutput> {
    console.log({
      rearrangementMenuInput,
    });
    return await this.menuService.rearrangementMenu(rearrangementMenuInput);
  }
}
