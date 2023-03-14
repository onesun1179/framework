import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { Message } from '../message';

@InputType()
@ArgsType()
export class InsertMessageRequest extends PickType(Message, [
  'text',
  'messageGroupCode',
]) {}
