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
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { IconRepository } from '@modules/icon/repository/icon.repository';
import { MenuRepository } from '@modules/menu/repository/menu.repository';
import { IconLabelOutput } from '@modules/icon/dto/output/entity/icon-label.output';
import { IconsIconLabelsRepository } from '@modules/icon/repository/icons-icon-labels.repository';
import { IconLabelRepository } from '@modules/icon/repository/icon-label.repository';
import { IconsIconLabelsOutput } from '@modules/icon/dto/output/entity/icons-icon-labels.output';
import { IconsInput } from '@modules/icon/dto/input/icons.input';
import { IconsOutput } from '@modules/icon/dto/output/icons.output';
import { PagingInput } from '@common/dto/input/paging.input';

@Resolver(() => IconOutput)
export class IconResolver {
  private readonly logger = new Logger(IconResolver.name);

  constructor(
    private iconRepository: IconRepository,
    private menuRepository: MenuRepository,
    private iconsIconLabelsRepository: IconsIconLabelsRepository,
    private iconLabelRepository: IconLabelRepository,
  ) {}

  @Query(() => IconOutput)
  async icon(@Args('seqNo', { type: () => Int }) seqNo: IconOutput['seqNo']) {
    return await this.iconRepository.findOneByOrFail({ seqNo });
  }

  @Query(() => IconsOutput)
  async icons(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('iconsInput', {
      type: () => IconsInput,
      nullable: true,
    })
    iconsInput: IconsInput,
  ): Promise<IconsOutput> {
    return await this.iconRepository.paging(pagingInput, iconsInput);
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => [MenuEntity])
  async menus(
    @Parent() { seqNo: iconSeqNo }: IconOutput,
  ): Promise<MenuEntity[]> {
    return await this.menuRepository.findBy({
      iconSeqNo,
    });
  }
  @ResolveField(() => String)
  fileFullPath(@Parent() { filePath }: IconOutput): string {
    return process.env.FILE_PATH!.concat(filePath);
  }
  @ResolveField(() => [IconLabelOutput])
  async labels(
    @Parent() { seqNo: iconSeqNo }: IconOutput,
  ): Promise<Array<IconLabelOutput>> {
    return await this.iconLabelRepository
      .createQueryBuilder(`il`)
      .innerJoin(
        IconsIconLabelsOutput,
        `isils`,
        `
      il.seq_no = isils.icon_label_seq_no
      `,
      )
      .where(`isils.icon_seq_no = :iconSeqNo`, {
        iconSeqNo,
      })
      .getMany();
  }
}
