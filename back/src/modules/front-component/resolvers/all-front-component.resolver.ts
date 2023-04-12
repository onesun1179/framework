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
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { InsertAllFrontComponentInput } from '@modules/front-component/dto/insert-all-front-component.input';
import { UpdateAllFrontComponentInput } from '@modules/front-component/dto/update-all-front-component.input';
import { AllFrontComponentRepository } from '@modules/front-component/repositories/all-front-component.repository';
import { FrontComponentRepository } from '@modules/front-component/repositories/front-component.repository';

@UseGuards(GqlAuthGuard)
@Resolver(() => AllFrontComponent)
export class AllFrontComponentResolver {
  constructor(
    private allFrontComponentRepository: AllFrontComponentRepository,
    private frontComponentRepository: FrontComponentRepository,
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
  ): Promise<AllFrontComponent | null> {
    return this.allFrontComponentRepository.findOneBy({
      id,
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => FrontComponent, {
    nullable: true,
  })
  async frontComponent(
    @Parent() { frontComponentId }: AllFrontComponent,
  ): Promise<FrontComponent | null> {
    if (!frontComponentId) {
      return null;
    }
    return await this.frontComponentRepository.findOne({
      where: {
        id: frontComponentId,
      },
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
    return this.allFrontComponentRepository.saveCustom(
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
    if (
      !(await this.allFrontComponentRepository.exist({
        where: {
          id: updateAllFrontComponentInput.id,
        },
      }))
    ) {
      throw new Error();
    }
    return await this.allFrontComponentRepository.saveCustom(
      updateAllFrontComponentInput,
    );
  }
}
