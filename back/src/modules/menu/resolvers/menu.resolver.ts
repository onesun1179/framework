import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { Menu } from '../model/Menu';
import { MenuService } from '../menu.service';
import { Role } from '../../role/model/Role';
import { Icon } from '../../icon/model/Icon';

@Resolver(() => Menu)
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}
  private readonly logger = new Logger(MenuResolver.name);

  @Query(() => Menu)
  message(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: Menu['seqNo'],
  ) {
    return this.menuService.getMenuRepository().findOneBy({
      seqNo,
    });
  }

  @ResolveField(() => [Menu], {})
  children(@Parent() { seqNo }: Menu): Promise<Menu['children']> {
    return this.menuService
      .getMenuRepository()
      .findOne({
        select: ['childMenuTrees'],
        relations: {
          childMenuTrees: true,
        },
        where: {
          seqNo,
        },
      })
      .then((r) => r?.childMenuTrees.map((o) => o.childMenu));
  }

  @ResolveField(() => [Menu], {})
  parents(@Parent() { seqNo }: Menu): Promise<Menu['parents']> {
    return this.menuService
      .getMenuRepository()
      .findOne({
        select: ['parentMenuTrees'],
        relations: {
          parentMenuTrees: true,
        },
        where: {
          seqNo,
        },
      })
      .then((r) => r?.parentMenuTrees.map((o) => o.parentMenu));
  }

  @ResolveField(() => [Role], {})
  async roles(@Parent() { seqNo }: Menu): Promise<Menu['roles']> {
    return await Menu.findOne({
      select: ['menuRoleMaps'],
      relations: {
        menuRoleMaps: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.menuRoleMaps.map((o) => o.role));
  }

  @ResolveField(() => Icon)
  icon(@Parent() { seqNo }: Menu): Promise<Menu['icon']> {
    return this.menuService
      .getMenuRepository()
      .findOne({
        select: ['icon'],
        relations: {
          icon: true,
        },
        where: {
          seqNo,
        },
      })
      .then((r) => r?.icon);
  }
}
