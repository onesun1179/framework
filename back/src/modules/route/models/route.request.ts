import {
  ArgsType,
  Field,
  InputType,
  Int,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Route } from '@modules/route/models/route';

@InputType()
export class InsertRouteRequest extends OmitType(Route, [
  'seqNo',
  'frontComponent',
  'parent',
  'roleRouteMaps',
  'menus',
]) {
  @Field(() => [Int], {
    nullable: true,
  })
  childSeqNos: Array<number>;

  @Field(() => [Int], {
    nullable: true,
  })
  roleSeqNos: Array<number>;

  @Field(() => [Int], {
    nullable: true,
  })
  menuSeqNos: Array<number>;
}

@InputType()
export class UpdateRouteRequest extends IntersectionType(
  PickType(Route, ['seqNo']),
  PartialType(InsertRouteRequest),
) {}

@InputType()
@ArgsType()
export class RoutesRequest {
  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
  })
  rootYn = false;

  @Field(() => [Int], {
    nullable: true,
  })
  seqNos: Array<number>;

  @Field(() => String, {
    nullable: true,
  })
  path: string;

  @Field(() => Int, {
    nullable: true,
  })
  parentSeqNo: number;
}
