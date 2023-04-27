import { ObjectType, PickType } from '@nestjs/graphql';
import { MessageOutput } from '@modules/message/dto/output/entity/message.output';

@ObjectType()
export class MsgOutput extends PickType(MessageOutput, [
  'text',
  'code',
  'groupCode',
  'seqNo',
]) {}
