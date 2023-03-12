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
import { UtilField } from '@util/Util.field';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';
import { InsertAllFrontComponentRequest } from '@modules/front-component/model/requests/insert-all-front-component.request';
import { UpdateAllFrontComponentRequest } from '@modules/front-component/model/requests/update-all-front-component.request';

@Resolver(() => AllFrontComponent)
export class AllFrontComponentResolver {
  constructor(private readonly frontComponentService: FrontComponentService) {}

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

  @ResolveField(() => FrontComponent, {
    description: UtilField.getFieldComment('front', 'component'),
  })
  async frontComponent(
    @Parent() { frontComponentId }: AllFrontComponent,
  ): Promise<FrontComponent> {
    return await FrontComponent.findOneBy({
      id: frontComponentId,
    });
  }

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
