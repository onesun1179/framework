import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Message } from '@modules/message/entities/message';
import { UtilField } from '@common/utils/util.field';

@InputType({
  description: UtilField.getFieldComment('message', 'update', 'input'),
})
@ArgsType()
export class UpdateMessageInput extends IntersectionType(
  PickType(Message, ['seqNo']),
  PartialType(PickType(Message, ['text', 'code', 'groupCode', 'name'])),
) {}
