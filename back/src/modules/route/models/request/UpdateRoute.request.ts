import {
  Field,
  InputType,
  Int,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';
import { Route } from '../Route';

@InputType({
  description: UtilField.getFieldComment('route', 'update', 'req'),
})
export class UpdateRouteRequest extends IntersectionType(
  PickType(Route, ['seqNo']),
  PartialType(PickType(Route, ['path', 'frontComponentSeqNo'])),
) {
  @Field(() => [Int], {
    nullable: true,
    description: UtilField.getFieldComment('child', 'seqNo', 's'),
  })
  childSeqNos?: number[];

  @Field(() => [Int], {
    nullable: true,
    description: UtilField.getFieldComment('parent', 'seqNo', 's'),
  })
  parentSeqNos?: number[];

  @Field(() => [Int], {
    nullable: true,
    description: UtilField.getFieldComment('role', 'seqNo', 's'),
  })
  roleSeqNos?: number[];
}
