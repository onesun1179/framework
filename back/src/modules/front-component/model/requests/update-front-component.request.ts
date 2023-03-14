import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { FrontComponent } from '@modules/front-component/model/front-component';
import { InsertFrontComponentRequest } from '@modules/front-component/model/requests/insert-front-component.request';

@InputType()
@ArgsType()
export class UpdateFrontComponentRequest extends IntersectionType(
  IntersectionType(
    PickType(FrontComponent, ['seqNo']),
    PartialType(
      PickType(FrontComponent, [
        'frontComponentTypeSeqNo',
        'initialFrontComponentSeqNo',
      ]),
    ),
  ),
  PartialType(
    PickType(InsertFrontComponentRequest, ['roleSeqNos', 'routeSeqNos']),
  ),
) {}
