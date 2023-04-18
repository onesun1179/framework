import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { RouteEntity } from '@modules/route/dto/output/entity/route.entity';
import { InsertRouteEntityInput } from '@modules/route/dto/input/insert-route-entity.input';

@InputType()
export class UpdateRouteEntityInput extends IntersectionType(
  PickType(RouteEntity, ['seqNo']),
  InsertRouteEntityInput,
) {}
