import { MessageOutput } from '@modules/message/dto/output/entity/message.output';
import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { InsertMessageInput } from '@modules/message/dto/input/insert-message.input';

@InputType()
@ArgsType()
export class UpdateMessageInput extends IntersectionType(
  PickType(MessageOutput, ['seqNo']),
  PartialType(InsertMessageInput),
) {}
