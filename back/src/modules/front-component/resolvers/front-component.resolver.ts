import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FrontComponentService } from '../front-component.service';
import { FrontComponent } from '@modules/front-component/model/front-component';
import { FrontComponentType } from '@modules/front-component/model/front-component-type';
import { UtilField } from '@util/Util.field';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';
import { Role } from '@modules/role/model/role';
import { RoleFrontComponentMap } from '@modules/role/model/role-front-component-map';
import { Route } from '@modules/route/models/route';

@Resolver(() => FrontComponent)
export class FrontComponentResolver {
  constructor(private readonly frontRouteService: FrontComponentService) {}

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
}
