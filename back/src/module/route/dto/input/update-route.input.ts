import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { RouteEntity } from '@modules/route/entity';
import { InsertRouteInput } from '@modules/route/dto';

@InputType()
export class UpdateRouteInput extends IntersectionType(
  PickType(RouteEntity, ['seqNo']),
  InsertRouteInput,
) {}
