import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FrontComponentService } from '../front-component.service';
import { FrontComponent } from '@modules/front-component/model/front-component';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';
import { InsertAllFrontComponentRequest } from '@modules/front-component/model/requests/insert-all-front-component.request';
import { UpdateAllFrontComponentRequest } from '@modules/front-component/model/requests/update-all-front-component.request';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../auth/guard/gql-auth.guard';
import { CurrentUser } from '@common/docorator/CurrentUser';
import { AfterAT } from '../../../auth/interfaces/AfterAT';
import { RoleFrontComponentMap } from '@modules/role/model/role-front-component-map';

@UseGuards(GqlAuthGuard)
@Resolver(() => AllFrontComponent)
export class AllFrontComponentResolver {
  constructor(private readonly frontComponentService: FrontComponentService) {}
  private readonly logger = new Logger(AllFrontComponentResolver.name);

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => AllFrontComponent, {
    nullable: true,
  })
  async allFrontComponent(
    @Args('id', {
      type: () => String,
    })
    id: string,
  ): Promise<AllFrontComponent> {
    return await AllFrontComponent.findOneBy({
      id,
    });
  }

  @Query(() => AllFrontComponent, {
    nullable: true,
  })
  async allFrontComponentByCurrentUserAndFrontComponentId(
    @Args('frontComponentId', {
      type: () => String,
    })
    frontComponentId: string,
    @CurrentUser() user: AfterAT,
  ): Promise<AllFrontComponent> {
    this.logger.log({
      ...user,
    });
    const a = await RoleFrontComponentMap.findOne({
      select: ['allFrontComponent'],
      relations: {
        allFrontComponent: true,
      },
      where: {
        roleSeqNo: user.roleSeqNo,
        frontComponentId,
      },
    }).then((r) => r?.allFrontComponent);
    console.log(a);
    return a;
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => FrontComponent)
  async frontComponent(
    @Parent() { frontComponentId }: AllFrontComponent,
  ): Promise<FrontComponent> {
    return await FrontComponent.findOneBy({
      id: frontComponentId,
    });
  }

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => AllFrontComponent)
  async insertAllFrontComponent(
    @Args('insertAllFrontComponentRequest', {
      type: () => InsertAllFrontComponentRequest,
    })
    insertAllFrontComponentRequest: InsertAllFrontComponentRequest,
  ) {
    return this.frontComponentService.saveAllFrontComponent(
      insertAllFrontComponentRequest,
    );
  }

  @Mutation(() => AllFrontComponent)
  async updateAllFrontComponent(
    @Args('updateAllFrontComponentRequest', {
      type: () => UpdateAllFrontComponentRequest,
    })
    updateAllFrontComponentRequest: UpdateAllFrontComponentRequest,
  ) {
    return this.frontComponentService.saveAllFrontComponent(
      updateAllFrontComponentRequest,
    );
  }
}
