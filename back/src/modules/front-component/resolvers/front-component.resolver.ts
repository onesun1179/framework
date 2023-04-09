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
import { Role } from '@modules/role/model/role';
import { RoleFrontComponentMap } from '@modules/role/model/role-front-component-map';
import { Route } from '@modules/route/models/route';
import { CurrentUser } from '@common/docorator/CurrentUser';
import { AfterAT } from '../../../auth/interfaces/AfterAT';
import { DataSource } from 'typeorm';
import { InsertFrontComponentInput } from '@modules/front-component/dto/insert-front-component.input';
import { UpdateFrontComponentInput } from '@modules/front-component/dto/update-front-component.input';
import { FrontComponentRepository } from '@modules/front-component/repositories/front-component.repository';

@Resolver(() => FrontComponent)
export class FrontComponentResolver {
  constructor(
    private readonly frontRouteService: FrontComponentService,
    private readonly frontComponentRepository: FrontComponentRepository,
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
    id: string,
  ): Promise<FrontComponent> {
    return await this.dataSource.manager.findOneBy(FrontComponent, {
      id,
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => AllFrontComponent, {
    nullable: true,
  })
  async allFrontComponent(
    @CurrentUser() currentUser: AfterAT,
    @Parent() { id: frontComponentId }: FrontComponent,
  ): Promise<AllFrontComponent> {
    return await this.dataSource.manager
      .findOne(RoleFrontComponentMap, {
        select: ['allFrontComponent'],
        where: {
          frontComponentId,
          roleSeqNo: currentUser.roleSeqNo,
        },
      })
      .then((r) => r?.allFrontComponent);
  }

  @ResolveField(() => [AllFrontComponent])
  async allFrontComponents(
    @Parent() { id }: FrontComponent,
  ): Promise<Array<AllFrontComponent>> {
    return await this.dataSource.manager.find(AllFrontComponent, {
      where: {
        frontComponentId: id,
      },
    });
  }

  @ResolveField(() => [Role])
  async roles(@Parent() { id }: FrontComponent): Promise<Array<Role>> {
    return await this.dataSource.manager
      .find(RoleFrontComponentMap, {
        select: ['role'],
        where: {
          frontComponentId: id,
        },
      })
      .then((r) => r.map((o) => o.role));
  }

  @ResolveField(() => [Route])
  async routes(@Parent() { id }: FrontComponent): Promise<Array<Route>> {
    return await this.dataSource.manager.find(Route, {
      where: {
        frontComponentId: id,
      },
    });
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
    return await this.frontRouteService.saveFrontComponent(
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
      (await FrontComponent.countBy({
        id: updateFrontComponentInput.id,
      })) === 0
    ) {
      throw new Error();
    }
    return await this.frontRouteService.saveFrontComponent(
      updateFrontComponentInput,
    );
  }
}
