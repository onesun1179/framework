import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { MessageGroupEntity } from '@modules/message/entity';
import { InsertMessageGroupInput } from '@modules/message/dto';

@InputType()
@ArgsType()
export class UpdateMessageGroupInput extends IntersectionType(
  PickType(MessageGroupEntity, ['code']),
  PartialType(PickType(InsertMessageGroupInput, ['name', 'messageSeqNos'])),
) {}
