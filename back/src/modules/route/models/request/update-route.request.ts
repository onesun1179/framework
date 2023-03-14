import {
  Field,
  InputType,
  Int,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Route } from '../route';

@InputType()
export class UpdateRouteRequest extends IntersectionType(
  PickType(Route, ['seqNo']),
  PartialType(PickType(Route, ['path', 'frontComponentId'])),
) {
  @Field(() => [Int], {
    nullable: true,
  })
  childSeqNos?: number[];

  @Field(() => [Int], {
    nullable: true,
  })
  parentSeqNos?: number[];

  @Field(() => [Int], {
    nullable: true,
  })
  roleSeqNos?: number[];
}
