import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FrontComponentService } from '@modules/front-component';
import {
  AllFrontComponentEntity,
  FrontComponentEntity,
} from '@modules/front-component/entity';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import {
  AllFrontComponentRepository,
  FrontComponentRepository,
} from '@modules/front-component/repository';
import { CurrentUser } from '@common/decorator/CurrentUser';
import { AfterAT } from '@auth/interfaces/AfterAT';
import {
  InsertAllFrontComponentInput,
  UpdateAllFrontComponentInput,
} from '@modules/front-component/dto/input';

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
    frontComponentId: FrontComponentEntity['id'],
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
