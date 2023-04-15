import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { MessageEntity } from '@modules/message/entity';

@InputType()
@ArgsType()
export class UpdateMessageInput extends IntersectionType(
  PickType(MessageEntity, ['seqNo']),
  PartialType(PickType(MessageEntity, ['text', 'code', 'groupCode', 'name'])),
) {}
