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
import { AllFrontComponentEntity } from '@modules/front-component/dto/output/entity/all-front-component.entity';
import { AllFrontComponentEntityRepository } from '@modules/front-component/repository/all-front-component-entity.repository';
import { FrontComponentEntityRepository } from '@modules/front-component/repository/front-component-entity.repository';
import { FrontComponentEntity } from '@modules/front-component/dto/output/entity/front-component.entity';
import { InsertAllFrontComponentEntityInput } from '@modules/front-component/dto/input/insert-all-front-component-entity.input';
import { UpdateAllFrontComponentEntityInput } from '@modules/front-component/dto/input/update-all-front-component-entity.input';
import { PagingInput } from '@common/dto/input/paging.input';
import { AllFrontComponentEntitiesOutput } from '@modules/front-component/dto/output/all-front-component-entities.output';
import { AllFrontComponentEntitiesInput } from '@modules/front-component/dto/input/all-front-component-entities.input';
import { ChkUniqByAllFcIdInput } from '@modules/front-component/dto/input/chk-uniq-by-all-fc-id.input';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { Nullable } from '@common/type';
import { RoleFrontComponentMapEntity } from '@modules/role/dto/output/entity/role-front-component-map.entity';

@UseGuards(GqlAuthGuard)
@Resolver(() => AllFrontComponentEntity)
export class AllFrontComponentEntityResolver {
  private readonly logger = new Logger(AllFrontComponentEntityResolver.name);

  constructor(
    private allFrontComponentRepository: AllFrontComponentEntityRepository,
    private frontComponentRepository: FrontComponentEntityRepository,
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

  @Query(() => AllFrontComponentEntity)
  async allFrontComponentById(
    @Args('allFrontComponentId', {
      type: () => String,
    })
    allFrontComponentId: AllFrontComponentEntity['id'],
  ): Promise<AllFrontComponentEntity> {
    return this.allFrontComponentRepository.findOneOrFail({
      where: {
        id: allFrontComponentId,
      },
    });
  }

  @Query(() => AllFrontComponentEntity, {
    nullable: true,
  })
  async allFrntCmpntByIdAndRole(
    @Args('frntCmpntId', {
      type: () => String,
    })
    frntCmpntId: string,
    @Args('roleSeqNo', {
      type: () => Int,
    })
    roleSeqNo: number,
  ): Promise<Nullable<AllFrontComponentEntity>> {
    return this.allFrontComponentRepository
      .createQueryBuilder(`afc`)
      .innerJoin(
        RoleFrontComponentMapEntity,
        `rfcm`,
        `
        afc.allFrontComponentId = :allFrontComponentId AND rfcm.roleSeqNo = :roleSeqNo AND rfcm.frontComponentId = :frntCmpntId`,
        {
          frntCmpntId,
          roleSeqNo,
        },
      )
      .getOne();
  }

  @Query(() => AllFrontComponentEntitiesOutput)
  async allFrontComponentEntities(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('allFrontComponentEntitiesInput', {
      type: () => AllFrontComponentEntitiesInput,
      nullable: true,
    })
    allFrontComponentEntitiesInput: AllFrontComponentEntitiesInput,
  ): Promise<AllFrontComponentEntitiesOutput> {
    return await this.allFrontComponentRepository.paging(
      pagingInput,
      allFrontComponentEntitiesInput,
    );
  }

  @Query(() => AllFrontComponentEntity, {
    nullable: true,
  })
  async allFrontComponentByFcId(
    @CurrentUser() user: AfterAT,
    @Args('frontComponentId', {
      type: () => String,
    })
    frontComponentId: string,
  ): Promise<AllFrontComponentEntity | null> {
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

  @ResolveField(() => FrontComponentEntity, {
    nullable: true,
  })
  async frontComponent(
    @Parent() { frontComponentId }: AllFrontComponentEntity,
  ): Promise<FrontComponentEntity | null> {
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
  @Mutation(() => AllFrontComponentEntity)
  async insertAllFrontComponent(
    @Args('insertAllFrontComponentInput', {
      type: () => InsertAllFrontComponentEntityInput,
    })
    insertAllFrontComponentInput: InsertAllFrontComponentEntityInput,
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

  @Mutation(() => AllFrontComponentEntity)
  async updateAllFrontComponent(
    @Args('updateAllFrontComponentInput', {
      type: () => UpdateAllFrontComponentEntityInput,
    })
    updateAllFrontComponentInput: UpdateAllFrontComponentEntityInput,
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
