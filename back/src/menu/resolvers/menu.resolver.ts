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
import { Auth } from '../../auth/model/Auth';
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

  @ResolveField(() => [Menu], {
    defaultValue: [],
  })
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

  @ResolveField(() => [Menu], {
    defaultValue: [],
  })
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

  @ResolveField(() => [Auth], {
    defaultValue: [],
  })
  auths(@Parent() { seqNo }: Menu): Promise<Menu['auths']> {
    return this.menuService
      .getMenuRepository()
      .findOne({
        select: ['menusAuths'],
        relations: {
          menusAuths: true,
        },
        where: {
          seqNo,
        },
      })
      .then((r) => r?.menusAuths.map((o) => o.auth));
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
