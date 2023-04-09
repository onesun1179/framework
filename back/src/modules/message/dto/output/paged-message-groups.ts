import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/paging.output';
import { MessageGroup } from '@modules/message/entities/message-group';
import { UtilField } from '@common/utils/util.field';

@ObjectType('GqlPagedMessageGroups', {
  description: UtilField.getFieldComment('paged', 'message', 'group', 's'),
})
export class PagedMessageGroups extends PagingOutput(MessageGroup) {}
