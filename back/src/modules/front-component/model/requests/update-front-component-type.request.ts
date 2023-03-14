import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { FrontComponentType } from '@modules/front-component/model/front-component-type';
import { InsertFrontComponentTypeRequest } from '@modules/front-component/model/requests/insert-front-component-type.request';

@InputType()
@ArgsType()
export class UpdateFrontComponentTypeRequest extends IntersectionType(
  PickType(FrontComponentType, ['seqNo']),
  PartialType(InsertFrontComponentTypeRequest),
) {}
