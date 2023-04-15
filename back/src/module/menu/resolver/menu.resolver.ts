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
import { MenuEntity } from '../entity/menu.entity';
import { MenuService } from '@modules/menu/menu.service';
import { MenuRepository } from '@modules/menu/repository/menu.repository';
import { MenuRoleMapRepository } from '@modules/menu/repository/menu-role-map.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { MenusOutput } from '@modules/menu/dto/output/menus.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { MenusInput } from '@modules/menu/dto/input/menus.input';
import { RoleEntity } from '@modules/role/entity/role.entity';
import { IconEntity } from '@modules/icon/entity/icon.entity';
import { isNil } from 'lodash';
import { RouteEntity } from '@modules/route/entity/route.entity';

@UseGuards(GqlAuthGuard)
@Resolver(() => MenuEntity)
export class MenuResolver {
  private readonly logger = new Logger(MenuResolver.name);

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

  @Query(() => MenuEntity)
  async messageBySeqNo(
    @Args('menuSeqNo', {
      type: () => Int,
    })
    menuSeqNo: MenuEntity['seqNo'],
  ) {
    return await this.menuRepository.findOneOrFail({
      where: {
        seqNo: menuSeqNo,
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

  @ResolveField(() => [RoleEntity])
  async roles(@Parent() { seqNo }: MenuEntity): Promise<Array<RoleEntity>> {
    return await this.roleRepository
      .createQueryBuilder(`r`)
      .innerJoin(`r.menuRoleMaps`, `mrm`)
      .where(`mrm.menuSeqNo = :menuSeqNo`, {
        menuSeqNo: seqNo,
      })
      .getMany();
  }

  @ResolveField(() => IconEntity, {
    nullable: true,
  })
  async icon(@Parent() { iconSeqNo }: MenuEntity): Promise<IconEntity | null> {
    if (!isNil(iconSeqNo)) {
      return await this.dataSource
        .createQueryBuilder<IconEntity>(IconEntity, 'icon')
        .where('icon.seqNo = :iconSeqNo', {
          iconSeqNo,
        })
        .getOne();
    }
    return null;
  }

  @ResolveField(() => RouteEntity, {
    nullable: true,
  })
  async route(
    @Parent() { routeSeqNo }: MenuEntity,
  ): Promise<RouteEntity | null> {
    return await this.dataSource
      .createQueryBuilder(RouteEntity, 'r')

      .where(`r.seqNo = :routeSeqNo`, {
        routeSeqNo,
      })

      .getOne();
  }
}
