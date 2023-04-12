import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { MessageGroup } from '@modules/message/entities/message-group';
import { InsertMessageGroupInput } from '@modules/message/dto/input/insert-message-group.input';

@InputType()
@ArgsType()
export class UpdateMessageGroupInput extends IntersectionType(
  PickType(MessageGroup, ['code']),
  PartialType(PickType(InsertMessageGroupInput, ['name', 'messageSeqNos'])),
) {}
