import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FrontComponentService } from '../front-component.service';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';
import { Role } from '@modules/role/entities/role.entity';
import { Route } from '@modules/route/dto/route';
import { CurrentUser } from '@common/docorator/CurrentUser';
import { AfterAT } from '../../../auth/interfaces/AfterAT';
import { DataSource } from 'typeorm';
import { InsertFrontComponentInput } from '@modules/front-component/dto/insert-front-component.input';
import { UpdateFrontComponentInput } from '@modules/front-component/dto/update-front-component.input';
import { FrontComponentRepository } from '@modules/front-component/repositories/front-component.repository';
import { AllFrontComponentRepository } from '@modules/front-component/repositories/all-front-component.repository';
import { RoleFrontComponentMapRepository } from '@modules/role/repositories/role-front-component-map.repository';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import { RouteRepository } from '@modules/route/repositories/route.repository';

@Resolver(() => FrontComponent)
export class FrontComponentResolver {
  constructor(
    private frontRouteService: FrontComponentService,
    private allFrontComponentRepository: AllFrontComponentRepository,
    private frontComponentRepository: FrontComponentRepository,
    private roleFrontComponentMapRepository: RoleFrontComponentMapRepository,
    private roleRepository: RoleRepository,
    private routeRepository: RouteRepository,
    private dataSource: DataSource,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => FrontComponent, {
    nullable: true,
  })
  async frontComponent(
    @Args('id', {
      type: () => String,
    })
    id: FrontComponent['id'],
  ): Promise<FrontComponent | null> {
    return await this.frontComponentRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => AllFrontComponent, {
    nullable: true,
  })
  async allFrontComponent(
    @CurrentUser() { roleSeqNo }: AfterAT,
    @Parent() { id: frontComponentId }: FrontComponent,
  ): Promise<AllFrontComponent | null> {
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

  @ResolveField(() => [AllFrontComponent])
  async allFrontComponents(
    @Parent() { id }: FrontComponent,
  ): Promise<Array<AllFrontComponent>> {
    return await this.allFrontComponentRepository
      .createQueryBuilder('afc')
      .where(`afc.frontComponentId = :id`, {
        id,
      })
      .getMany();
  }

  @ResolveField(() => [Role])
  async roles(@Parent() { id }: FrontComponent): Promise<Array<Role>> {
    return await this.roleRepository
      .createQueryBuilder('r')
      .innerJoin(`r.roleFrontComponentMaps`, `rfcm`)
      .where(`rfcm.frontComponentId = :frontComponentId`, {
        frontComponentId: id,
      })
      .getMany();
  }

  @ResolveField(() => [Route])
  async routes(
    @Parent() { id: frontComponentId }: FrontComponent,
  ): Promise<Array<Route>> {
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
  @Mutation(() => FrontComponent)
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

  @Mutation(() => FrontComponent)
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
