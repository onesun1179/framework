import { ArgsType, InputType } from '@nestjs/graphql';
import { InsertMessageGroupInput } from '@modules/message/dto/input/insert-message-group.input';

@InputType()
@ArgsType()
export class UpdateMessageGroupInput extends InsertMessageGroupInput {}
