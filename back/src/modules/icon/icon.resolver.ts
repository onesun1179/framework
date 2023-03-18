import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { IconService } from './icon.service';
import { Logger } from '@nestjs/common';
import { Icon } from './model/icon';
import { Menu } from '@modules/menu/model/menu';
import * as process from 'process';

@Resolver(() => Icon)
export class IconResolver {
  constructor(private readonly iconService: IconService) {}
  private readonly logger = new Logger(IconResolver.name);

  @Query(() => Icon)
  async icon(@Args('seqNo', { type: () => Int }) seqNo: Icon['seqNo']) {
    return await Icon.findOneBy({ seqNo });
  }

  @ResolveField(() => String)
  filePath(@Parent() { filePath }: Icon): string {
    return process.env.FILE_PATH.concat(filePath);
  }

  @ResolveField(() => [Menu])
  async menus(@Parent() { seqNo }: Icon): Promise<Menu[]> {
    return await Icon.findOne({
      select: ['menus'],
      relations: {
        menus: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.menus);
  }

  // @Mutation(() => Icon)
  // insertIcon(
  //   @Args('icon', {
  //     type: () => InsertIconIn,
  //   })
  //   insertIcon: InsertIconIn,
  // ) {}
}
