import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { CurrentUser } from '@common/decorator/CurrentUser';
import { AfterAT } from '@auth/interfaces/AfterAT';
import { AllFrontComponentEntity } from '@modules/front-component/entity/all-front-component.entity';
import { AllFrontComponentRepository } from '@modules/front-component/repository/all-front-component.repository';
import { FrontComponentRepository } from '@modules/front-component/repository/front-component.repository';
import { FrontComponentService } from '@modules/front-component/front-component.service';
import { FrontComponentEntity } from '@modules/front-component/entity/front-component.entity';
import { InsertAllFrontComponentInput } from '@modules/front-component/dto/input/insert-all-front-component.input';
import { UpdateAllFrontComponentInput } from '@modules/front-component/dto/input/update-all-front-component.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => AllFrontComponentEntity)
export class AllFrontComponentResolver {
  private readonly logger = new Logger(AllFrontComponentResolver.name);

  constructor(
    private allFrontComponentRepository: AllFrontComponentRepository,
    private frontComponentRepository: FrontComponentRepository,
    private readonly frontComponentService: FrontComponentService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
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
  async allFrontComponentByAuth(
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
      type: () => InsertAllFrontComponentInput,
    })
    insertAllFrontComponentInput: InsertAllFrontComponentInput,
  ) {
    return this.allFrontComponentRepository.saveCustom(
      insertAllFrontComponentInput,
    );
  }

  @Mutation(() => AllFrontComponentEntity)
  async updateAllFrontComponent(
    @Args('updateAllFrontComponentInput', {
      type: () => UpdateAllFrontComponentInput,
    })
    updateAllFrontComponentInput: UpdateAllFrontComponentInput,
  ) {
    if (
      !(await this.allFrontComponentRepository.exist({
        where: {
          id: updateAllFrontComponentInput.id,
        },
      }))
    ) {
      throw new Error();
    }
    return await this.allFrontComponentRepository.saveCustom(
      updateAllFrontComponentInput,
    );
  }
}
