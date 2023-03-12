import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { IconService } from './icon.service';
import { Logger } from '@nestjs/common';
import { Icon } from './model/Icon';
import { Menu } from '../menu/model/Menu';

@Resolver(() => Icon)
export class IconResolver {
  constructor(private readonly iconService: IconService) {}
  private readonly logger = new Logger(IconResolver.name);

  @Query(() => Icon)
  async icon(@Args('id', { type: () => String }) id: Icon['id']) {
    return await this.iconService.getIconRepository().findOneBy({ id });
  }

  @ResolveField(() => [Menu])
  async menus(@Parent() { id }: Icon): Promise<Menu[]> {
    return await this.iconService
      .getIconRepository()
      .findOne({
        select: ['menus'],
        relations: {
          menus: true,
        },
        where: {
          id,
        },
      })
      .then((r) => r?.menus);
  }

  // @Mutation(() => Icon)
  // insertIcon(
  //   @Args('icon', {
  //     type: () => InsertIconIn,
  //   })
  //   insertIcon: InsertIconIn,
  // ) {}
}
