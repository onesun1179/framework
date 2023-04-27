import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { IconOutput } from '@modules/icon/dto/output/entity/icon.output';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';
import process from 'process';
import { IconRepository } from '@modules/icon/repository/icon.repository';
import { MenuRepository } from '@modules/menu/repository/menu.repository';

@Resolver(() => IconOutput)
export class IconResolver {
  private readonly logger = new Logger(IconResolver.name);

  constructor(
    private iconRepository: IconRepository,
    private menuRepository: MenuRepository,
  ) {}

  @Query(() => IconOutput)
  async icon(@Args('seqNo', { type: () => Int }) seqNo: IconOutput['seqNo']) {
    return await this.iconRepository.findOneByOrFail({ seqNo });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => [MenuOutput])
  async menus(
    @Parent() { seqNo: iconSeqNo }: IconOutput,
  ): Promise<MenuOutput[]> {
    return await this.menuRepository.findBy({
      iconSeqNo,
    });
  }
  @ResolveField(() => String)
  filePath(@Parent() { filePath }: IconOutput): string {
    return process.env.FILE_PATH!.concat(filePath);
  }

  // @Mutation(() => IconOutput)
  // insertIcon(
  //   @Args('icon', {
  //     type: () => InsertIconIn,
  //   })
  //   insertIcon: InsertIconIn,
  // ) {}
}
