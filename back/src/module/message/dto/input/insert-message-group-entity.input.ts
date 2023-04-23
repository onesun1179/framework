import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { MessageGroupEntity } from '@modules/message/dto/output/entity/message-group.entity';

@InputType()
@ArgsType()
export class InsertMessageGroupEntityInput extends PickType(
  MessageGroupEntity,
  ['name', 'code', 'desc'],
) {}
