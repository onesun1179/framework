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
import { IconEntity } from '@modules/icon/entity';
import { MenuEntity } from '@modules/menu/entity/menu.entity';
import * as process from 'process';

@Resolver(() => IconEntity)
export class IconResolver {
  constructor(private readonly iconService: IconService) {}
  private readonly logger = new Logger(IconResolver.name);

  @Query(() => IconEntity)
  async icon(@Args('seqNo', { type: () => Int }) seqNo: IconEntity['seqNo']) {
    return await IconEntity.findOneBy({ seqNo });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => String)
  filePath(@Parent() { filePath }: IconEntity): string {
    return process.env.FILE_PATH!.concat(filePath);
  }

  @ResolveField(() => [MenuEntity])
  async menus(@Parent() { seqNo }: IconEntity): Promise<MenuEntity[]> {
    return MenuEntity.createQueryBuilder('m')
      .where(`m.iconSeqNo = :iconSeqNo`, {
        iconSeqNo: seqNo,
      })
      .distinct()
      .getMany();
  }

  // @Mutation(() => IconEntity)
  // insertIcon(
  //   @Args('icon', {
  //     type: () => InsertIconIn,
  //   })
  //   insertIcon: InsertIconIn,
  // ) {}
}