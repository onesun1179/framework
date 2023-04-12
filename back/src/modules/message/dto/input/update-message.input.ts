import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Message } from '@modules/message/entities/message';

@InputType()
@ArgsType()
export class UpdateMessageInput extends IntersectionType(
  PickType(Message, ['seqNo']),
  PartialType(PickType(Message, ['text', 'code', 'groupCode', 'name'])),
) {}
