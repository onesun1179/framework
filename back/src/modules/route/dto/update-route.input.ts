import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { Route } from '@modules/route/dto/route';
import { InsertRouteInput } from '@modules/route/dto/insert-route.input';

@InputType()
export class UpdateRouteInput extends IntersectionType(
  PickType(Route, ['seqNo']),
  InsertRouteInput,
) {}
