import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { MessageEntity } from '@modules/message/dto/output/entity/message.entity';

@ArgsType()
@InputType()
export class MsgInput extends PickType(MessageEntity, ['code', 'groupCode']) {}
