import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { RouteEntity } from '@modules/route/entity/route.entity';
import { InsertRouteInput } from '@modules/route/dto/input/insert-route.input';

@InputType()
export class UpdateRouteInput extends IntersectionType(
  PickType(RouteEntity, ['seqNo']),
  InsertRouteInput,
) {}
