import {
  Field,
  InputType,
  Int,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { RouteEntity } from '@modules/route/entity/route.entity';

@InputType()
export class InsertRouteInput extends IntersectionType(
  PickType(RouteEntity, ['path']),
  PickType(PartialType(RouteEntity), ['frontComponentId', 'parentSeqNo']),
) {
  @Field(() => [Int], {
    nullable: true,
  })
  childSeqNos?: Array<number>;

  @Field(() => [Int], {
    nullable: true,
  })
  roleSeqNos?: Array<number>;

  @Field(() => [Int], {
    nullable: true,
  })
  menuSeqNos?: Array<number>;
}
