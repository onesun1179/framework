import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FrontComponentService } from '../front-component.service';
import {
  AllFrontComponentEntity,
  FrontComponentEntity,
} from '@modules/front-component/entity';
import { RoleEntity } from '@modules/role/entity';
import { RouteEntity } from '@modules/route/entity';
import { CurrentUser } from '@common/decorator/CurrentUser';
import { AfterAT } from '@auth/interfaces/AfterAT';
import {
  InsertFrontComponentInput,
  UpdateFrontComponentInput,
} from '@modules/front-component/dto';
import {
  AllFrontComponentRepository,
  FrontComponentRepository,
} from '@modules/front-component/repository';
import {
  RoleFrontComponentMapRepository,
  RoleRepository,
} from '@modules/role/repository';
import { RouteRepository } from '@modules/route/repositories';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';

@Resolver(() => FrontComponentEntity)
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
      type: () => InsertFrontComponentInput,
    })
    insertFrontComponentInput: InsertFrontComponentInput,
  ) {
    return await this.frontComponentRepository.saveCustom(
      insertFrontComponentInput,
    );
  }

  @Mutation(() => FrontComponentEntity)
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
