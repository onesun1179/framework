import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/outputs/paging.output';
import { MessageGroup } from '@modules/message/entities/message-group';

@ObjectType('GqlPagedMessageGroups')
export class PagedMessageGroups extends PagingOutput(MessageGroup) {}
