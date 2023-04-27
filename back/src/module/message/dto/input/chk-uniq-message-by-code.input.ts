import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { MessageOutput } from '@modules/message/dto/output/entity/message.output';

@InputType()
@ArgsType()
export class ChkUniqMessageByCodeInput extends PickType(MessageOutput, [
  'code',
  'groupCode',
]) {}
