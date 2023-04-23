import { MessageEntity } from '@modules/message/dto/output/entity/message.entity';
import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

@InputType()
@ArgsType()
export class UpdateMessageEntityInput extends IntersectionType(
  PickType(MessageEntity, ['seqNo']),
  PartialType(PickType(MessageEntity, ['text', 'name', 'desc'])),
) {}
