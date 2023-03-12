import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Route } from '../Route';
import { UtilField } from '@util/Util.field';

@InputType({
  description: UtilField.getFieldComment('route', 'insert', 'req'),
})
export class InsertRouteRequest extends PickType(Route, [
  'path',
  'frontComponentSeqNo',
] as const) {
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
