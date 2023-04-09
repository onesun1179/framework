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
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../auth/guard/gql-auth.guard';
import { CurrentUser } from '@common/docorator/CurrentUser';
import { AfterAT } from '../../../auth/interfaces/AfterAT';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { InsertAllFrontComponentInput } from '@modules/front-component/dto/insert-all-front-component.input';
import { UpdateAllFrontComponentInput } from '@modules/front-component/dto/update-all-front-component.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => AllFrontComponent)
export class AllFrontComponentResolver {
  constructor(
    private readonly frontComponentService: FrontComponentService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
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
    @CurrentUser() { roleSeqNo }: AfterAT,
  ): Promise<AllFrontComponent> {
    return this.dataSource
      .createQueryBuilder<AllFrontComponent>(AllFrontComponent, 'afc')
      .innerJoin('afc.roleFrontComponentMaps', 'rfc', '')
      .where(`rfc.roleSeqNo = :roleSeqNo`, {
        roleSeqNo,
      })
      .where('afc.frontComponentId = :frontComponentId', {
        frontComponentId,
      })
      .getOne();
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
    @Args('insertAllFrontComponentInput', {
      type: () => InsertAllFrontComponentInput,
    })
    insertAllFrontComponentInput: InsertAllFrontComponentInput,
  ) {
    return this.frontComponentService.saveAllFrontComponent(
      insertAllFrontComponentInput,
    );
  }

  @Mutation(() => AllFrontComponent)
  async updateAllFrontComponent(
    @Args('updateAllFrontComponentInput', {
      type: () => UpdateAllFrontComponentInput,
    })
    updateAllFrontComponentInput: UpdateAllFrontComponentInput,
  ) {
    return this.frontComponentService.saveAllFrontComponent(
      updateAllFrontComponentInput,
    );
  }
}
