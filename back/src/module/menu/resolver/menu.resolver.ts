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
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { MenusOutput } from '@modules/menu/dto/output/menus.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { MenusInput } from '@modules/menu/dto/input/menus.input';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { IconOutput } from '@modules/icon/dto/output/entity/icon.output';
import { isNil } from 'lodash';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';
import { MenuRoleMapRepository } from '@modules/menu/repository/menu-role-map.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { IconRepository } from '@modules/icon/repository/icon.repository';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { CurrentUser } from '@common/decorator/CurrentUser';
import { AfterAT } from '@auth/interfaces/AfterAT';
import { MenuRoleMapOutput } from '@modules/menu/dto/output/entity/menu-role-map.output';

@UseGuards(GqlAuthGuard)
@Resolver(() => MenuOutput)
export class MenuResolver {
  private readonly logger = new Logger(MenuResolver.name);

  constructor(
    private readonly menuService: MenuService,
    private readonly menuRepository: MenuRepository,
    private readonly menuRoleMapRepository: MenuRoleMapRepository,
    private readonly roleRepository: RoleRepository,
    private readonly iconEntityRepository: IconRepository,
    private readonly routeRepository: RouteRepository,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => MenuOutput)
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
    return await this.menuRepository.paging(pagingInput, menusInput);
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => [RoleOutput])
  async roles(@Parent() { seqNo }: MenuOutput): Promise<Array<RoleOutput>> {
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
  async icon(@Parent() { iconSeqNo }: MenuOutput): Promise<IconOutput | null> {
    if (!isNil(iconSeqNo)) {
      return await this.iconEntityRepository.findOne({
        where: {
          seqNo: iconSeqNo,
        },
      });
    }
    return null;
  }

  @ResolveField(() => RouteOutput, {
    nullable: true,
  })
  async route(
    @Parent() { routeSeqNo }: MenuOutput,
  ): Promise<RouteOutput | null> {
    if (!isNil(routeSeqNo)) {
      return await this.routeRepository.findOne({
        where: {
          seqNo: routeSeqNo!,
        },
      });
    }
    return null;
  }

  @ResolveField(() => [MenuOutput])
  async children(
    @Parent() { seqNo: menuSeqNo }: MenuOutput,
    @CurrentUser() { roleSeqNo }: AfterAT,
  ): Promise<Array<MenuOutput>> {
    return await this.menuRepository
      .createQueryBuilder('menu')
      .innerJoin(
        MenuRoleMapOutput,
        `child`,
        `
      child.menuSeqNo = menu.seqNo AND
      child.roleSeqNo = :roleSeqNo
      `,
        {
          roleSeqNo,
        },
      )
      .innerJoin(
        MenuRoleMapOutput,
        `parent`,
        `
      parent.menuSeqNo = :parentMenuSeqNo AND
      parent.roleSeqNo = child.roleSeqNo AND
      child.parentSeqNo = parent.seq_no
      `,
        {
          parentMenuSeqNo: menuSeqNo,
          roleSeqNo,
        },
      )
      .getMany();
  }
}
