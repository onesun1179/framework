import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';
import { InsertRouteInput } from '@modules/route/dto/input/insert-route.input';

@InputType()
export class UpdateRouteInput extends IntersectionType(
  PickType(RouteOutput, ['seqNo']),
  InsertRouteInput,
) {}
