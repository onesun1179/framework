import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { MenuEntity } from '@modules/menu/entity';
import { MenuService } from '@modules/menu';
import { RoleEntity } from '@modules/role/entity';
import { IconEntity } from '@modules/icon/entity';
import { GqlAuthGuard } from '@auth/guard';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { isNil } from 'lodash';
import { RouteEntity } from '@modules/route/entity';
import {
  MenuRepository,
  MenuRoleMapRepository,
} from '@modules/menu/repository';
import { RoleRepository } from '@modules/role/repository';
import { MenusOutput } from '@modules/menu/dto/output';
import { PagingInput } from '@common/dto/input';
import { MenusInput } from '@modules/menu/dto/input';

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
