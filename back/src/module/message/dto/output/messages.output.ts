import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { MessageOutput } from '@modules/message/dto/output/entity/message.output';

@ObjectType()
export class MessagesOutput extends PagingOutput(MessageOutput) {}
