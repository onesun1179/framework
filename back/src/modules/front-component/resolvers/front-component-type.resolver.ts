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
import { FrontComponentType } from '@modules/front-component/model/front-component-type';
import { FrontComponent } from '@modules/front-component/model/front-component';
import { InsertFrontComponentTypeRequest } from '@modules/front-component/model/requests/insert-front-component-type.request';
import { UpdateFrontComponentTypeRequest } from '@modules/front-component/model/requests/update-front-component-type.request';

@Resolver(() => FrontComponentType)
export class FrontComponentTypeResolver {
  constructor(private readonly frontComponentService: FrontComponentService) {}

  @Query(() => FrontComponent, {
    nullable: true,
  })
  async frontComponentType(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<FrontComponentType> {
    return await FrontComponentType.findOneBy({
      seqNo,
    });
  }

  @ResolveField(() => [FrontComponent])
  async frontComponents(@Parent() { seqNo }: FrontComponentType) {
    return await FrontComponentType.findOne({
      select: ['frontComponents'],
      relations: {
        frontComponents: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.frontComponents);
  }

  @Mutation(() => FrontComponentType)
  async insertFrontComponentType(
    @Args('insertFrontComponentTypeRequest', {
      type: () => InsertFrontComponentTypeRequest,
    })
    insertFrontComponentTypeRequest: InsertFrontComponentTypeRequest,
  ) {
    return await this.frontComponentService.saveFrontComponentType(
      insertFrontComponentTypeRequest,
    );
  }

  @Mutation(() => FrontComponentType)
  async updateFrontComponentType(
    @Args('updateFrontComponentTypeRequest', {
      type: () => UpdateFrontComponentTypeRequest,
    })
    updateFrontComponentTypeRequest: UpdateFrontComponentTypeRequest,
  ) {
    if (
      !(await FrontComponentType.findOneBy({
        seqNo: updateFrontComponentTypeRequest.seqNo,
      }))
    ) {
      throw new Error();
    }
    return await this.frontComponentService.saveFrontComponentType(
      updateFrontComponentTypeRequest,
    );
  }
}
