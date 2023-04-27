import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { MessageOutput } from '@modules/message/dto/output/entity/message.output';

@ArgsType()
@InputType()
export class MsgInput extends PickType(MessageOutput, ['code', 'groupCode']) {}
