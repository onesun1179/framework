import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CurrentUser } from '@common/decorator/CurrentUser';
import { AfterAT } from '@auth/interfaces/AfterAT';
import { FrontComponentEntity } from '@modules/front-component/dto/output/entity/front-component.entity';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { FrontComponentService } from '@modules/front-component/front-component.service';
import { AllFrontComponentEntityRepository } from '@modules/front-component/repository/all-front-component-entity.repository';
import { FrontComponentEntityRepository } from '@modules/front-component/repository/front-component-entity.repository';
import { RoleFrontComponentMapEntityRepository } from '@modules/role/repository/role-front-component-map-entity.repository';
import { RoleEntityRepository } from '@modules/role/repository/role-entity.repository';
import { RouteEntityRepository } from '@modules/route/repository/route-entity.repository';
import { AllFrontComponentEntity } from '@modules/front-component/dto/output/entity/all-front-component.entity';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { RouteEntity } from '@modules/route/dto/output/entity/route.entity';
import { InsertFrontComponentEntityInput } from '@modules/front-component/dto/input/insert-front-component-entity.input';
import { UpdateFrontComponentEntityInput } from '@modules/front-component/dto/input/update-front-component-entity.input';
import { PagingInput } from '@common/dto/input/paging.input';
import { FrontComponentEntitiesOutput } from '@modules/front-component/dto/output/front-component-entities.output';
import { FrontComponentEntitiesInput } from '@modules/front-component/dto/input/front-component-entities.input';

@Resolver(() => FrontComponentEntity)
@UseGuards(GqlAuthGuard)
export class FrontComponentEntityResolver {
  constructor(
    private frontRouteService: FrontComponentService,
    private allFrontComponentRepository: AllFrontComponentEntityRepository,
    private frontComponentRepository: FrontComponentEntityRepository,
    private roleFrontComponentMapRepository: RoleFrontComponentMapEntityRepository,
    private roleRepository: RoleEntityRepository,
    private routeRepository: RouteEntityRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => FrontComponentEntitiesOutput)
  async frontComponentEntities(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('frontComponentEntitiesInput', {
      type: () => FrontComponentEntitiesInput,
      nullable: true,
    })
    frontComponentEntitiesInput: FrontComponentEntitiesInput,
  ): Promise<FrontComponentEntitiesOutput> {
    return await this.frontComponentRepository.paging(
      pagingInput,
      frontComponentEntitiesInput,
    );
  }

  @Query(() => FrontComponentEntity)
  async frontComponentById(
    @Args('frontComponentId', {
      type: () => String,
    })
    frontComponentId: FrontComponentEntity['id'],
  ): Promise<FrontComponentEntity> {
    return await this.frontComponentRepository.findOneOrFail({
      where: {
        id: frontComponentId,
      },
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => AllFrontComponentEntity, {
    nullable: true,
  })
  async allFrontComponent(
    @CurrentUser() { roleSeqNo }: AfterAT,
    @Parent() { id: frontComponentId }: FrontComponentEntity,
  ): Promise<AllFrontComponentEntity | null> {
    return this.allFrontComponentRepository
      .createQueryBuilder(`afc`)
      .innerJoin(
        `afc.roleFrontComponentMaps`,
        `rfcm`,
        `rfcm.roleSeqNo = :roleSeqNo AND rfcm.frontComponentId = :frontComponentId`,
        {
          roleSeqNo,
          frontComponentId,
        },
      )
      .getOne();
  }

  @ResolveField(() => AllFrontComponentEntity, {
    nullable: true,
  })
  async allFrontComponentByRole(
    @Args('roleSeqNo', {
      type: () => Int,
    })
    roleSeqNo: number,
    @Parent() { id: frontComponentId }: FrontComponentEntity,
  ): Promise<AllFrontComponentEntity | null> {
    return this.allFrontComponentRepository
      .createQueryBuilder(`afc`)
      .innerJoin(
        `afc.roleFrontComponentMaps`,
        `rfcm`,
        `rfcm.roleSeqNo = :roleSeqNo AND rfcm.frontComponentId = :frontComponentId`,
        {
          roleSeqNo,
          frontComponentId,
        },
      )
      .getOne();
  }

  @ResolveField(() => [AllFrontComponentEntity])
  async allFrontComponents(
    @Parent() { id }: FrontComponentEntity,
  ): Promise<Array<AllFrontComponentEntity>> {
    return await this.allFrontComponentRepository
      .createQueryBuilder('afc')
      .where(`afc.frontComponentId = :id`, {
        id,
      })
      .getMany();
  }

  @ResolveField(() => [RoleEntity])
  async roles(
    @Parent() { id }: FrontComponentEntity,
  ): Promise<Array<RoleEntity>> {
    return await this.roleRepository
      .createQueryBuilder('r')
      .innerJoin(`r.roleFrontComponentMaps`, `rfcm`)
      .where(`rfcm.frontComponentId = :frontComponentId`, {
        frontComponentId: id,
      })
      .getMany();
  }

  @ResolveField(() => [RouteEntity])
  async routes(
    @Parent() { id: frontComponentId }: FrontComponentEntity,
  ): Promise<Array<RouteEntity>> {
    return this.routeRepository
      .createQueryBuilder(`route`)
      .where(`route.frontComponentId = :frontComponentId`, {
        frontComponentId,
      })
      .getMany();
  }

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => FrontComponentEntity)
  async insertFrontComponent(
    @Args('insertFrontComponentInput', {
      type: () => InsertFrontComponentEntityInput,
    })
    insertFrontComponentInput: InsertFrontComponentEntityInput,
  ) {
    return await this.frontComponentRepository.saveCustom(
      insertFrontComponentInput,
    );
  }

  @Mutation(() => FrontComponentEntity)
  async updateFrontComponent(
    @Args('updateFrontComponentInput', {
      type: () => UpdateFrontComponentEntityInput,
    })
    updateFrontComponentInput: UpdateFrontComponentEntityInput,
  ) {
    if (
      !(await this.frontComponentRepository.exist({
        where: {
          id: updateFrontComponentInput.id,
        },
      }))
    ) {
      throw new Error();
    }
    return await this.frontComponentRepository.saveCustom(
      updateFrontComponentInput,
    );
  }
}
