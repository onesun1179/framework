import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/paging.output';
import { Message } from '@modules/message/entities/message';

@ObjectType('GqlPagedMessages')
export class PagedMessages extends PagingOutput(Message) {}
