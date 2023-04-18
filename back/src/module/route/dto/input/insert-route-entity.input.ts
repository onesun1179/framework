import {
  Field,
  InputType,
  Int,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { RouteEntity } from '@modules/route/dto/output/entity/route.entity';

@InputType()
export class InsertRouteEntityInput extends IntersectionType(
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
