import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { MessageGroup } from '@modules/message/entities/message-group';
import { UtilField } from '@common/utils/util.field';
import { InsertMessageGroupInput } from '@modules/message/dto/input/insert-message-group.input';

@InputType({
  description: UtilField.getFieldComment('message', 'group', 'update', 'input'),
})
@ArgsType()
export class UpdateMessageGroupInput extends IntersectionType(
  PickType(MessageGroup, ['code']),
  PartialType(PickType(InsertMessageGroupInput, ['name', 'messageSeqNos'])),
) {}
