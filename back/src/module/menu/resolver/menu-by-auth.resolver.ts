import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';

import { CurrentUser } from '@common/decorator/CurrentUser';
import { AfterAT } from '@auth/interfaces/AfterAT';
import { GqlError } from '@common/error/GqlError';
import { Builder } from 'builder-pattern';
import { MenuEntity } from '@modules/menu/entity/menu.entity';
import { MenuByAuthOutput } from '@modules/menu/dto/output/menu-by-auth.output';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';
import { MenuService } from '@modules/menu/menu.service';
import { MenuRepository } from '@modules/menu/repository/menu.repository';
import { MessageConstant } from '@common/constants/message.constant';
import { MenuRoleMapEntity } from '@modules/menu/entity/menu-role-map.entity';

function menuToMenuByAuthOutput(menu: MenuEntity): MenuByAuthOutput | null {
  if (menu.menuRoleMaps && menu.menuRoleMaps.length > 0) {
    const { orderNo, roleSeqNo } = menu.menuRoleMaps[0];

    return Builder(MenuByAuthOutput, {
      ...menu,
      orderNo,
      roleSeqNo,
    }).build();
  }

  return null;
}

@UseGuards(GqlAuthGuard)
@Resolver(() => MenuByAuthOutput)
export class MenuByAuthResolver {
  private readonly logger = new Logger(MenuByAuthResolver.name);

  constructor(
    private readonly menuService: MenuService,
    private readonly menuRepository: MenuRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => MenuByAuthOutput)
  async menuByAuth(
    @Args('menuSeqNo', {
      type: () => Int,
    })
    menuSeqNo: number,
    @CurrentUser()
    { roleSeqNo }: AfterAT,
  ): Promise<MenuByAuthOutput> {
    const menu = await this.menuRepository
      .createQueryBuilder('menu')
      .innerJoinAndSelect(`menu.menuRoleMaps`, `mrm`)
      .where(`mrm.menuSeqNo = :menuSeqNo AND mrm.roleSeqNo = :roleSeqNo`, {
        menuSeqNo,
        roleSeqNo,
      })
      .getOneOrFail();

    const menuByAuthOutput = menuToMenuByAuthOutput(menu);
    if (menuByAuthOutput) {
      return menuByAuthOutput;
    } else {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE());
    }
  }

  @ResolveField(() => [MenuByAuthOutput])
  async children(
    @Parent() { seqNo, roleSeqNo }: MenuByAuthOutput,
  ): Promise<Array<MenuByAuthOutput>> {
    const menus = await this.menuRepository
      .createQueryBuilder('m')
      .innerJoin(
        MenuRoleMapEntity,
        `child`,
        `m.seqNo = child.menuSeqNo AND child.roleSeqNo = :roleSeqNo`,
        {
          roleSeqNo,
        },
      )
      .innerJoin(
        MenuRoleMapEntity,
        `parent`,
        `child.parentSeqNo = parent.seqNo AND parent.roleSeqNo = :roleSeqNo AND parent.menuSeqNo = :menuSeqNo`,
        {
          roleSeqNo,
          menuSeqNo: seqNo,
        },
      )
      .getMany();
    return menus.map((menu) => menuToMenuByAuthOutput(menu)!);
  }
}
