import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { MessageGroupOutput } from '@modules/message/dto/output/entity/message-group.output';

@ObjectType()
export class MessageGroupsOutput extends PagingOutput(MessageGroupOutput) {}
