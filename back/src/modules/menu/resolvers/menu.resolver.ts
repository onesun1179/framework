import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { Menu } from '../model/menu';
import { MenuService } from '../menu.service';
import { Role } from '@modules/role/entities/role.entity';
import { Icon } from '@modules/icon/model/icon';
import { GqlAuthGuard } from '../../../auth/guard/gql-auth.guard';
import { CurrentUser } from '@common/docorator/CurrentUser';
import { AfterAT } from '../../../auth/interfaces/AfterAT';
import { MenuRoleMap } from '@modules/menu/model/menu-role-map';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { isNil } from 'lodash';
import { Route } from '@modules/route/dto/route';

@UseGuards(GqlAuthGuard)
@Resolver(() => Menu)
export class MenuResolver {
  constructor(
    private readonly menuService: MenuService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  private readonly logger = new Logger(MenuResolver.name);

  @Query(() => Menu)
  async message(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: Menu['seqNo'],
  ) {
    return await this.dataSource
      .createQueryBuilder(Menu, 'Menu')
      .where('Menu.seqNo = :seqNo', {
        seqNo,
      })
      .getMany();
  }

  @ResolveField(() => [Role], {
    defaultValue: [],
  })
  async roles(@Parent() { seqNo }: Menu): Promise<Array<Role>> {
    return await this.dataSource
      .createQueryBuilder<Role>(Role, 'role')
      .innerJoin(
        'role.menuRoleMaps',
        'menuRoleMaps',
        'menuRoleMaps.menuSeqNo = :menuSeqNo',
        {
          menuSeqNo: seqNo,
        },
      )
      .getMany();
  }

  @ResolveField(() => Icon, {
    nullable: true,
  })
  async icon(@Parent() { iconSeqNo }: Menu): Promise<Icon | null> {
    if (!isNil(iconSeqNo)) {
      return await this.dataSource
        .createQueryBuilder<Icon>(Icon, 'icon')
        .where('icon.seqNo = :iconSeqNo', {
          iconSeqNo,
        })
        .getOne();
    }
    return null;
  }

  @ResolveField(() => [Menu], {
    defaultValue: [],
  })
  async children(
    @Parent() { seqNo }: Menu,
    @CurrentUser() { roleSeqNo }: AfterAT,
  ) {
    return this.dataSource
      .createQueryBuilder<Menu>(Menu, 'm')
      .innerJoin('m.menuRoleMaps', 'mr')
      .innerJoin('mr.children', 'mrp')
      .where(`mr.roleSeqNo = :roleSeqNo`, {
        roleSeqNo,
      })
      .andWhere(
        (qr) =>
          `mrp.parentMenuRoleMapSeqNo IN (${qr
            .createQueryBuilder()
            .select(`mrm.seqNo`)
            .from(MenuRoleMap, `mrm`)
            .where(`mrm.menuSeqNo = ${seqNo}`)
            .getQuery()})`,
      )

      .getMany();
  }

  @ResolveField(() => Route, {
    nullable: true,
  })
  async route(
    @Parent() { routeSeqNo }: Menu,
    @CurrentUser() { roleSeqNo }: AfterAT,
  ): Promise<Route | null> {
    return await this.dataSource
      .createQueryBuilder(Route, 'r')

      .where(`r.seqNo = :routeSeqNo`, {
        routeSeqNo,
      })

      .getOne();
  }

  // @Query(() => Menus)
  // async menus(
  //   @Args('paging', {
  //     type: () => PagingInput,
  //   })
  //   paging: PagingInput,
  //   @Args('param', {
  //     type: () => MenusRequest,
  //     nullable: true,
  //   })
  //   param?: MenusRequest,
  // ): Promise<Menus> {
  //   return await this.dataSource.transaction(async (entityManager) => {
  //     return Builder(
  //       Menus,
  //       await UtilPaging.getRes(
  //         paging,
  //         entityManager.createQueryBuilder(Menu, 'm'),
  //       ),
  //     ).build();
  //   });
  // }
}
