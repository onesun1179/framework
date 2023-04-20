import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { MessageEntity } from '@modules/message/dto/output/entity/message.entity';

@InputType()
@ArgsType()
export class ChkUniqMessageByCodeInput extends PickType(MessageEntity, [
  'code',
  'groupCode',
]) {}
