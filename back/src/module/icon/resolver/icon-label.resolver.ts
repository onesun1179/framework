import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { IconRepository } from '@modules/icon/repository/icon.repository';
import { MenuRepository } from '@modules/menu/repository/menu.repository';
import { IconsIconLabelsRepository } from '@modules/icon/repository/icons-icon-labels.repository';
import { IconLabelRepository } from '@modules/icon/repository/icon-label.repository';
import { IconLabelOutput } from '@modules/icon/dto/output/entity/icon-label.output';
import { IconOutput } from '@modules/icon/dto/output/entity/icon.output';
import { IconsIconLabelsOutput } from '@modules/icon/dto/output/entity/icons-icon-labels.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { IconLabelsOutput } from '@modules/icon/dto/output/icon-labels.output';
import { IconLabelsInput } from '@modules/icon/dto/input/icon-labels.input';

@Resolver(() => IconLabelOutput)
export class IconLabelResolver {
  private readonly logger = new Logger(IconLabelResolver.name);

  constructor(
    private iconRepository: IconRepository,
    private menuRepository: MenuRepository,
    private iconsIconLabelsRepository: IconsIconLabelsRepository,
    private iconLabelRepository: IconLabelRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => IconLabelOutput)
  async iconLabel(
    @Args('iconLabelSeqNo', {
      type: () => Int,
    })
    iconLabelSeqNo: number,
  ) {
    return this.iconLabelRepository.findOneByOrFail({
      seqNo: iconLabelSeqNo,
    });
  }

  @Query(() => IconLabelsOutput)
  async iconLabels(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('iconLabelsInput', {
      type: () => IconLabelsInput,
      nullable: true,
    })
    iconLabelsInput: IconLabelsInput,
  ): Promise<IconLabelsOutput> {
    return await this.iconLabelRepository.paging(pagingInput, iconLabelsInput);
  }

  @Query(() => [IconLabelOutput])
  async iconLabelByIconSeqNo(
    @Args('iconSeqNo', {
      type: () => Int,
    })
    iconSeqNo: number,
  ): Promise<Array<IconLabelOutput>> {
    return this.iconLabelRepository
      .createQueryBuilder(`il`)
      .innerJoin(
        IconsIconLabelsOutput,
        `isils`,
        `
      il.seq_no = isils.icon_label_seq_no
      `,
      )
      .innerJoin(
        IconOutput,
        `i`,
        `
      i.seq_no = isils.icon_seq_no
      `,
      )
      .where(`i.seq_no = :iconSeqNo`, {
        iconSeqNo,
      })
      .getMany();
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => [IconOutput])
  async icons(@Parent() { seqNo: labelSeqNo }: IconLabelOutput) {
    return await this.iconRepository
      .createQueryBuilder(`i`)
      .innerJoin(
        IconsIconLabelsOutput,
        `isils`,
        `
      isils.icon_seq_no = i.seq_no AND
      isils.icon_label_seq_no = :labelSeqNo
      `,
        {
          labelSeqNo,
        },
      )
      .getMany();
  }
}
