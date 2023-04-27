import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';

import { CurrentUser } from '@common/decorator/CurrentUser';
import { AfterAT } from '@auth/interfaces/AfterAT';
import { AllFrontComponentOutput } from '@modules/front-component/dto/output/entity/all-front-component.output';
import { AllFrontComponentRepository } from '@modules/front-component/repository/all-front-component.repository';
import { FrontComponentRepository } from '@modules/front-component/repository/front-component.repository';
import { FrontComponentOutput } from '@modules/front-component/dto/output/entity/front-component.output';
import { InsertAllFrontComponentInput } from '@modules/front-component/dto/input/insert-all-front-component.input';
import { UpdateAllFrontComponentInput } from '@modules/front-component/dto/input/update-all-front-component.input';
import { PagingInput } from '@common/dto/input/paging.input';
import { AllFrontComponentsOutput } from '@modules/front-component/dto/output/all-front-components.output';
import { AllFrontComponentsInput } from '@modules/front-component/dto/input/all-front-components.input';
import { ChkUniqByAllFcIdInput } from '@modules/front-component/dto/input/chk-uniq-by-all-fc-id.input';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { Nullable } from '@common/type';
import { RoleFrontComponentMapOutput } from '@modules/role/dto/output/entity/role-front-component-map.output';

@UseGuards(GqlAuthGuard)
@Resolver(() => AllFrontComponentOutput)
export class AllFrontComponentResolver {
  private readonly logger = new Logger(AllFrontComponentResolver.name);

  constructor(
    private allFrontComponentRepository: AllFrontComponentRepository,
    private frontComponentRepository: FrontComponentRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => Boolean)
  async chkUniqByAllFcId(
    @Args('input', {
      type: () => ChkUniqByAllFcIdInput,
    })
    input: ChkUniqByAllFcIdInput,
  ): Promise<boolean> {
    return !(await this.allFrontComponentRepository.exist({
      where: {
        id: input.id,
      },
    }));
  }

  @Query(() => AllFrontComponentOutput)
  async allFrontComponentById(
    @Args('allFrontComponentId', {
      type: () => String,
    })
    allFrontComponentId: string,
  ): Promise<AllFrontComponentOutput> {
    return this.allFrontComponentRepository.findOneOrFail({
      where: {
        id: allFrontComponentId,
      },
    });
  }

  @Query(() => AllFrontComponentOutput, {
    nullable: true,
  })
  async allFrontComponentByIdAndRole(
    @Args('frontComponentId', {
      type: () => String,
    })
    frontComponentId: string,
    @Args('roleSeqNo', {
      type: () => Int,
    })
    roleSeqNo: number,
  ): Promise<Nullable<AllFrontComponentOutput>> {
    return this.allFrontComponentRepository
      .createQueryBuilder(`afc`)
      .innerJoin(
        RoleFrontComponentMapOutput,
        `rfcm`,
        `
        afc.allFrontComponentId = :allFrontComponentId AND rfcm.roleSeqNo = :roleSeqNo AND rfcm.frontComponentId = :frontComponentId`,
        {
          frontComponentId,
          roleSeqNo,
        },
      )
      .getOne();
  }

  @Query(() => AllFrontComponentsOutput)
  async allFrontComponents(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('allFrontComponentsInput', {
      type: () => AllFrontComponentsInput,
      nullable: true,
    })
    allFrontComponentsInput: AllFrontComponentsInput,
  ): Promise<AllFrontComponentsOutput> {
    return await this.allFrontComponentRepository.paging(
      pagingInput,
      allFrontComponentsInput,
    );
  }

  @Query(() => AllFrontComponentOutput, {
    nullable: true,
  })
  async allFrontComponentByFcId(
    @CurrentUser() user: AfterAT,
    @Args('frontComponentId', {
      type: () => String,
    })
    frontComponentId: string,
  ): Promise<AllFrontComponentOutput | null> {
    return await this.allFrontComponentRepository
      .createQueryBuilder(`afc`)
      .innerJoin(`afc.roleFrontComponentMaps`, `rfcm`)
      .where(
        `rfcm.roleSeqNo = :roleSeqNo AND afc.frontComponentId = :frontComponentId`,
        {
          roleSeqNo: user.roleSeqNo,
          frontComponentId,
        },
      )
      .getOne();
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => FrontComponentOutput, {
    nullable: true,
  })
  async frontComponent(
    @Parent() { frontComponentId }: AllFrontComponentOutput,
  ): Promise<FrontComponentOutput | null> {
    if (!frontComponentId) {
      return null;
    }
    return await this.frontComponentRepository.findOne({
      where: {
        id: frontComponentId,
      },
    });
  }

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => AllFrontComponentOutput)
  async insertAllFrontComponent(
    @Args('insertAllFrontComponentInput', {
      type: () => InsertAllFrontComponentInput,
    })
    insertAllFrontComponentInput: InsertAllFrontComponentInput,
  ) {
    if (
      await this.allFrontComponentRepository.hasRow(
        insertAllFrontComponentInput.id,
      )
    )
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));

    return await this.allFrontComponentRepository.saveCustom(
      insertAllFrontComponentInput,
    );
  }

  @Mutation(() => AllFrontComponentOutput)
  async updateAllFrontComponent(
    @Args('updateAllFrontComponentInput', {
      type: () => UpdateAllFrontComponentInput,
    })
    updateAllFrontComponentInput: UpdateAllFrontComponentInput,
  ) {
    if (
      !(await this.allFrontComponentRepository.hasRow(
        updateAllFrontComponentInput.id,
      ))
    )
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
    return await this.allFrontComponentRepository.saveCustom(
      updateAllFrontComponentInput,
    );
  }
}
