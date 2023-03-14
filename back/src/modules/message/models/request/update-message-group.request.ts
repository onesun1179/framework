import {
  ArgsType,
  InputType,
  IntersectionType,
  PickType,
} from '@nestjs/graphql';
import { MessageGroup } from '../message-group';
import { InsertMessageGroupRequest } from './insert-message-group.request';

@InputType()
@ArgsType()
export class UpdateMessageGroupRequest extends IntersectionType(
  PickType(MessageGroup, ['seqNo']),
  InsertMessageGroupRequest,
) {}
