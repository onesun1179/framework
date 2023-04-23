import { ObjectType, PickType } from '@nestjs/graphql';
import { MessageEntity } from '@modules/message/dto/output/entity/message.entity';

@ObjectType()
export class MsgOutput extends PickType(MessageEntity, [
  'text',
  'code',
  'groupCode',
  'seqNo',
]) {}
