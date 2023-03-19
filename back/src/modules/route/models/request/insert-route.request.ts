import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Route } from '../route';

@InputType()
export class InsertRouteRequest extends PickType(Route, [
  'path',
  'parentSeqNo',
  'frontComponentId',
] as const) {
  @Field(() => [Int], {
    nullable: true,
  })
  childSeqNos?: number[];

  @Field(() => [Int], {
    nullable: true,
  })
  roleSeqNos?: number[];
}
