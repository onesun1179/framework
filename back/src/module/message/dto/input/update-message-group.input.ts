import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { InsertMessageGroupInput } from '@modules/message/dto/input/insert-message-group.input';
import { MessageGroupEntity } from '@modules/message/entity/message-group.entity';

@InputType()
@ArgsType()
export class UpdateMessageGroupInput extends IntersectionType(
  PickType(MessageGroupEntity, ['code']),
  PartialType(PickType(InsertMessageGroupInput, ['name', 'messageSeqNos'])),
) {}
