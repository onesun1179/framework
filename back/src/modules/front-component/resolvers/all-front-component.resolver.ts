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
import { UtilField } from '@util/Util.field';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';
import { InsertAllFrontComponentRequest } from '@modules/front-component/model/requests/insert-all-front-component.request';
import { UpdateAllFrontComponentRequest } from '@modules/front-component/model/requests/update-all-front-component.request';

@Resolver(() => AllFrontComponent)
export class AllFrontComponentResolver {
  constructor(private readonly frontComponentService: FrontComponentService) {}

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => AllFrontComponent, {
    nullable: true,
  })
  async allFrontComponent(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<AllFrontComponent> {
    return await AllFrontComponent.findOneBy({
      seqNo,
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => FrontComponent, {
    description: UtilField.getFieldComment('front', 'component'),
  })
  async frontComponent(
    @Parent() { frontComponentSeqNo }: AllFrontComponent,
  ): Promise<FrontComponent> {
    return await FrontComponent.findOneBy({
      seqNo: frontComponentSeqNo,
    });
  }

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => AllFrontComponent, {
    description: UtilField.getFieldComment(
      'all',
      'front',
      'component',
      'insert',
      'req',
    ),
  })
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

  @Mutation(() => AllFrontComponent, {
    description: UtilField.getFieldComment(
      'all',
      'front',
      'component',
      'update',
      'req',
    ),
  })
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
