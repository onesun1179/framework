import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FrontComponentService } from '../front-component.service';
import { FrontComponentType } from '@modules/front-component/model/FrontComponentType';
import { FrontComponent } from '@modules/front-component/model/FrontComponent';
import { UtilField } from '@util/Util.field';

@Resolver(() => FrontComponentType)
export class FrontComponentTypeResolver {
  constructor(private readonly frontRouteService: FrontComponentService) {}

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

  @ResolveField(() => [FrontComponent], {
    description: UtilField.getFieldComment('front', 'component', 's'),
  })
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
}
