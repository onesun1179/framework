import { Query, Resolver } from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { Menu } from '../model/menu';
import { MenuService } from '../menu.service';
import { CurrentUser } from '@common/docorator/CurrentUser';
import { GqlAuthGuard } from '../../../auth/guard/gql-auth.guard';
import { AfterAT } from '../../../auth/interfaces/AfterAT';
import { MenuRoleMap } from '@modules/menu/model/menu-role-map';
import { MenuRoleMapTree } from '@modules/menu/model/menu-role-map-tree';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@UseGuards(GqlAuthGuard)
@Resolver(() => [Menu])
export class MenusResolver {
  constructor(
    private readonly menuService: MenuService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  private readonly logger = new Logger(MenusResolver.name);

  @Query(() => [Menu], {
    defaultValue: [],
  })
  async rootMenus(@CurrentUser() { roleSeqNo }: AfterAT): Promise<Array<Menu>> {
    return await this.dataSource
      .createQueryBuilder(MenuRoleMap, 'MenuRoleMap')
      .where('MenuRoleMap.roleSeqNo = :roleSeqNo', {
        roleSeqNo,
      })
      .andWhere(
        (qb) =>
          `MenuRoleMap.seqNo not in (${qb
            .createQueryBuilder()
            .distinct()
            .select('MenuRoleMapTree.childMenuRoleMapSeqNo')
            .from(MenuRoleMapTree, 'MenuRoleMapTree')
            .getQuery()})`,
      )
      .innerJoinAndSelect('MenuRoleMap.menu', 'menu')

      .getMany()
      .then((r) => r.map((o) => o.menu));
  }
}
