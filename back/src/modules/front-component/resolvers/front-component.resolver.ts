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
import { FrontComponentType } from '@modules/front-component/model/front-component-type';
import { UtilField } from '@util/Util.field';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';
import { Role } from '@modules/role/model/role';
import { RoleFrontComponentMap } from '@modules/role/model/role-front-component-map';
import { Route } from '@modules/route/models/route';
import { InsertFrontComponentRequest } from '@modules/front-component/model/requests/insert-front-component.request';
import { UpdateFrontComponentRequest } from '@modules/front-component/model/requests/update-front-component.request';
import { CurrentUser } from '@common/docorator/CurrentUser';
import { AfterAT } from '../../../auth/interfaces/AfterAT';

@Resolver(() => FrontComponent)
export class FrontComponentResolver {
  constructor(private readonly frontRouteService: FrontComponentService) {}

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
    return await FrontComponent.findOneBy({
      id,
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => AllFrontComponent, {
    nullable: true,
    description:
      UtilField.getFieldComment('auth', 'by', 'all', 'front', 'component') +
      `토큰 없으면 비회원 컴포넌트`,
  })
  async allFrontComponentByCurrentUser(
    @CurrentUser() currentUser: AfterAT,
    @Parent() { id: frontComponentId }: FrontComponent,
  ): Promise<AllFrontComponent> {
    return await RoleFrontComponentMap.findOne({
      select: ['allFrontComponent'],
      where: {
        frontComponentId,
        roleSeqNo: currentUser.roleSeqNo,
      },
    }).then((r) => r?.allFrontComponent);
  }

  @ResolveField(() => FrontComponentType, {
    description: UtilField.getFieldComment('front', 'component', 'type'),
  })
  async frontComponentType(
    @Parent() { frontComponentTypeSeqNo }: FrontComponent,
  ) {
    return await FrontComponentType.findOneBy({
      seqNo: frontComponentTypeSeqNo,
    });
  }

  @ResolveField(() => [AllFrontComponent], {
    description: UtilField.getFieldComment('all', 'front', 'component', 's'),
  })
  async allFrontComponents(
    @Parent() { id }: FrontComponent,
  ): Promise<Array<AllFrontComponent>> {
    return await FrontComponent.findOne({
      select: ['allFrontComponents'],
      relations: {
        allFrontComponents: true,
      },
      where: {
        id,
      },
    }).then((r) => r?.allFrontComponents);
  }

  @ResolveField(() => AllFrontComponent, {
    description: UtilField.getFieldComment('front', 'component', 'initial'),
  })
  async initialFrontComponent(
    @Parent() { initialFrontComponentId }: FrontComponent,
  ): Promise<AllFrontComponent> {
    return await AllFrontComponent.findOneBy({
      id: initialFrontComponentId,
    });
  }

  @ResolveField(() => [Role], {
    description: UtilField.getFieldComment('role', 's'),
  })
  async roles(@Parent() { id }: FrontComponent): Promise<Array<Role>> {
    return await RoleFrontComponentMap.find({
      select: ['role'],
      relations: {
        role: true,
      },
      where: {
        frontComponentId: id,
      },
    }).then((r) => r?.map((o) => o.role));
  }

  @ResolveField(() => [Route])
  async routes(@Parent() { id }: FrontComponent): Promise<Array<Route>> {
    return await FrontComponent.findOne({
      select: ['routes'],
      relations: {
        routes: true,
      },
      where: {
        id,
      },
    }).then((r) => r.routes);
  }

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => FrontComponent, {
    description: UtilField.getFieldComment(
      'front',
      'component',
      'insert',
      'req',
    ),
  })
  async insertFrontComponent(
    @Args('insertFrontComponentRequest', {
      type: () => InsertFrontComponentRequest,
    })
    insertFrontComponentRequest: InsertFrontComponentRequest,
  ) {
    return await this.frontRouteService.saveFrontComponent(
      insertFrontComponentRequest,
    );
  }

  @Mutation(() => FrontComponent, {
    description: UtilField.getFieldComment(
      'front',
      'component',
      'update',
      'req',
    ),
  })
  async updateFrontComponent(
    @Args('updateFrontComponentRequest', {
      type: () => UpdateFrontComponentRequest,
    })
    updateFrontComponentRequest: UpdateFrontComponentRequest,
  ) {
    if (
      (await FrontComponent.countBy({
        id: updateFrontComponentRequest.id,
      })) === 0
    ) {
      throw new Error();
    }
    return await this.frontRouteService.saveFrontComponent(
      updateFrontComponentRequest,
    );
  }
}
