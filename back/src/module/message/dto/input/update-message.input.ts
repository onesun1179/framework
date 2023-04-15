import { MessageEntity } from '@modules/message/entity/message.entity';
import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

@InputType()
@ArgsType()
export class UpdateMessageInput extends IntersectionType(
  PickType(MessageEntity, ['seqNo']),
  PartialType(PickType(MessageEntity, ['text', 'code', 'groupCode', 'name'])),
) {}
