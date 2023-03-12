import {
  ArgsType,
  Field,
  InputType,
  Int,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { FrontComponent } from '@modules/front-component/model/front-component';

@InputType()
@ArgsType()
export class UpdateFrontComponentRequest extends IntersectionType(
  PickType(FrontComponent, ['id']),
  PartialType(
    PickType(FrontComponent, [
      'frontComponentTypeSeqNo',
      'initialFrontComponentId',
    ]),
  ),
) {
  @Field(() => [Int], {
    nullable: true,
  })
  roleSeqNos: Array<number>;

  @Field(() => [Int], {
    nullable: true,
  })
  routeSeqNos: Array<number>;
}
