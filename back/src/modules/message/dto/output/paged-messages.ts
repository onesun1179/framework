import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/paging.output';
import { Message } from '@modules/message/entities/message';
import { UtilField } from '@common/utils/util.field';

@ObjectType('GqlPagedMessages', {
  description: UtilField.getFieldComment('paged', 'message', 's'),
})
export class PagedMessages extends PagingOutput(Message) {}
