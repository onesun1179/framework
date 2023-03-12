import {
  ArgsType,
  InputType,
  IntersectionType,
  PickType,
} from '@nestjs/graphql';
import { MessageGroup } from '../MessageGroup';
import { InsertMessageGroupRequest } from './InsertMessageGroup.request';
import { UtilField } from '@util/Util.field';

@InputType({
  description: UtilField.getFieldComment('message', 'group', 'update', 'req'),
})
@ArgsType()
export class UpdateMessageGroupRequest extends IntersectionType(
  PickType(MessageGroup, ['seqNo']),
  InsertMessageGroupRequest,
) {}
