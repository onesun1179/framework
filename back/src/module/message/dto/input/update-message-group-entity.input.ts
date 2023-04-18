import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { InsertMessageGroupEntityInput } from '@modules/message/dto/input/insert-message-group-entity.input';
import { MessageGroupEntity } from '@modules/message/dto/output/entity/message-group.entity';

@InputType()
@ArgsType()
export class UpdateMessageGroupEntityInput extends IntersectionType(
  PickType(MessageGroupEntity, ['code']),
  PartialType(
    PickType(InsertMessageGroupEntityInput, ['name', 'messageSeqNos']),
  ),
) {}
