import {
  Field,
  InputType,
  Int,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';

@InputType()
export class InsertRouteInput extends IntersectionType(
  PickType(RouteOutput, ['path']),
  PickType(PartialType(RouteOutput), ['frontComponentId', 'parentSeqNo']),
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
