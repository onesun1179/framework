import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { IconEntity } from '@modules/icon/dto/output/entity/icon.entity';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';

@Resolver(() => IconEntity)
export class IconEntityResolver {
  private readonly logger = new Logger(IconEntityResolver.name);

  constructor() {}

  @Query(() => IconEntity)
  async icon(@Args('seqNo', { type: () => Int }) seqNo: IconEntity['seqNo']) {
    return await IconEntity.findOneBy({ seqNo });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

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
