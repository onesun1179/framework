import {
  Field,
  InputType,
  Int,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Route } from '@modules/route/dto/route';

@InputType()
export class InsertRouteInput extends IntersectionType(
  PickType(Route, ['path']),
  PickType(PartialType(Route), ['frontComponentId', 'parentSeqNo']),
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
