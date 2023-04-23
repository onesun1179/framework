import { ArgsType, InputType } from '@nestjs/graphql';
import { InsertMessageGroupEntityInput } from '@modules/message/dto/input/insert-message-group-entity.input';

@InputType()
@ArgsType()
export class UpdateMessageGroupEntityInput extends InsertMessageGroupEntityInput {}
