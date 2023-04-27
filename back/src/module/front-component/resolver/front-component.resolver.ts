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
import { FrontComponentOutput } from '@modules/front-component/dto/output/entity/front-component.output';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { FrontComponentService } from '@modules/front-component/front-component.service';
import { AllFrontComponentRepository } from '@modules/front-component/repository/all-front-component.repository';
import { FrontComponentRepository } from '@modules/front-component/repository/front-component.repository';
import { RoleFrontComponentMapRepository } from '@modules/role/repository/role-front-component-map.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { AllFrontComponentOutput } from '@modules/front-component/dto/output/entity/all-front-component.output';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';
import { InsertFrontComponentInput } from '@modules/front-component/dto/input/insert-front-component.input';
import { UpdateFrontComponentInput } from '@modules/front-component/dto/input/update-front-component.input';
import { PagingInput } from '@common/dto/input/paging.input';
import { FrontComponentsOutput } from '@modules/front-component/dto/output/front-components.output';
import { FrontComponentsInput } from '@modules/front-component/dto/input/front-components.input';

@Resolver(() => FrontComponentOutput)
@UseGuards(GqlAuthGuard)
export class FrontComponentResolver {
  constructor(
    private frontRouteService: FrontComponentService,
    private allFrontComponentRepository: AllFrontComponentRepository,
    private frontComponentRepository: FrontComponentRepository,
    private roleFrontComponentMapRepository: RoleFrontComponentMapRepository,
    private roleRepository: RoleRepository,
    private routeRepository: RouteRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => FrontComponentsOutput)
  async frontComponents(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('frontComponentsInput', {
      type: () => FrontComponentsInput,
      nullable: true,
    })
    frontComponentsInput: FrontComponentsInput,
  ): Promise<FrontComponentsOutput> {
    return await this.frontComponentRepository.paging(
      pagingInput,
      frontComponentsInput,
    );
  }

  @Query(() => FrontComponentOutput)
  async frontComponentById(
    @Args('frontComponentId', {
      type: () => String,
    })
    frontComponentId: FrontComponentOutput['id'],
  ): Promise<FrontComponentOutput> {
    return await this.frontComponentRepository.findOneOrFail({
      where: {
        id: frontComponentId,
      },
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => AllFrontComponentOutput, {
    nullable: true,
  })
  async allFrontComponent(
    @CurrentUser() { roleSeqNo }: AfterAT,
    @Parent() { id: frontComponentId }: FrontComponentOutput,
  ): Promise<AllFrontComponentOutput | null> {
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

  @ResolveField(() => AllFrontComponentOutput, {
    nullable: true,
  })
  async allFrontComponentByRole(
    @Args('roleSeqNo', {
      type: () => Int,
    })
    roleSeqNo: number,
    @Parent() { id: frontComponentId }: FrontComponentOutput,
  ): Promise<AllFrontComponentOutput | null> {
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

  @ResolveField(() => [AllFrontComponentOutput])
  async allFrontComponents(
    @Parent() { id }: FrontComponentOutput,
  ): Promise<Array<AllFrontComponentOutput>> {
    return await this.allFrontComponentRepository
      .createQueryBuilder('afc')
      .where(`afc.frontComponentId = :id`, {
        id,
      })
      .getMany();
  }

  @ResolveField(() => [RoleOutput])
  async roles(
    @Parent() { id }: FrontComponentOutput,
  ): Promise<Array<RoleOutput>> {
    return await this.roleRepository
      .createQueryBuilder('r')
      .innerJoin(`r.roleFrontComponentMaps`, `rfcm`)
      .where(`rfcm.frontComponentId = :frontComponentId`, {
        frontComponentId: id,
      })
      .getMany();
  }

  @ResolveField(() => [RouteOutput])
  async routes(
    @Parent() { id: frontComponentId }: FrontComponentOutput,
  ): Promise<Array<RouteOutput>> {
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
  @Mutation(() => FrontComponentOutput)
  async insertFrontComponent(
    @Args('insertFrontComponentInput', {
      type: () => InsertFrontComponentInput,
    })
    insertFrontComponentInput: InsertFrontComponentInput,
  ) {
    return await this.frontComponentRepository.saveCustom(
      insertFrontComponentInput,
    );
  }

  @Mutation(() => FrontComponentOutput)
  async updateFrontComponent(
    @Args('updateFrontComponentInput', {
      type: () => UpdateFrontComponentInput,
    })
    updateFrontComponentInput: UpdateFrontComponentInput,
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
