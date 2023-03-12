import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';
import { FrontComponentType } from '@modules/front-component/model/front-component-type';
import { InsertFrontComponentTypeRequest } from '@modules/front-component/model/requests/insert-front-component-type.request';

@InputType({
  description: UtilField.getFieldComment(
    'front',
    'component',
    'type',
    'insert',
    'req',
  ),
})
@ArgsType()
export class UpdateFrontComponentTypeRequest extends IntersectionType(
  PickType(FrontComponentType, ['seqNo']),
  PartialType(InsertFrontComponentTypeRequest),
) {}
