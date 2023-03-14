import {
  Args,
  Int,
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

@Resolver(() => FrontComponent)
export class FrontComponentResolver {
  constructor(private readonly frontRouteService: FrontComponentService) {}

  @Query(() => FrontComponent, {
    nullable: true,
  })
  async frontComponent(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<FrontComponent> {
    return await FrontComponent.findOneBy({
      seqNo,
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
    @Parent() { seqNo }: FrontComponent,
  ): Promise<Array<AllFrontComponent>> {
    return await FrontComponent.findOne({
      select: ['allFrontComponents'],
      relations: {
        allFrontComponents: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.allFrontComponents);
  }

  @ResolveField(() => AllFrontComponent, {
    description: UtilField.getFieldComment('front', 'component', 'initial'),
  })
  async initialFrontComponent(
    @Parent() { initialFrontComponentSeqNo }: FrontComponent,
  ): Promise<AllFrontComponent> {
    return await AllFrontComponent.findOneBy({
      seqNo: initialFrontComponentSeqNo,
    });
  }

  @ResolveField(() => [Role], {
    description: UtilField.getFieldComment('role', 's'),
  })
  async roles(@Parent() { seqNo }: FrontComponent): Promise<Array<Role>> {
    return await RoleFrontComponentMap.find({
      select: ['role'],
      relations: {
        role: true,
      },
      where: {
        frontComponentSeqNo: seqNo,
      },
    }).then((r) => r?.map((o) => o.role));
  }

  @ResolveField(() => [Route])
  async routes(@Parent() { seqNo }: FrontComponent): Promise<Array<Route>> {
    return await FrontComponent.findOne({
      select: ['routes'],
      relations: {
        routes: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r.routes);
  }

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
        seqNo: updateFrontComponentRequest.seqNo,
      })) === 0
    ) {
      throw new Error();
    }
    return await this.frontRouteService.saveFrontComponent(
      updateFrontComponentRequest,
    );
  }
}
