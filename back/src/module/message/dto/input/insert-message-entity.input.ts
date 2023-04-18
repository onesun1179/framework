import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { MessageEntity } from '@modules/message/dto/output/entity/message.entity';

@InputType()
@ArgsType()
export class InsertMessageEntityInput extends PickType(MessageEntity, [
  'text',
  'code',
  'groupCode',
  'name',
]) {}
