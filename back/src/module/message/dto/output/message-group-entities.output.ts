import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { MessageGroupEntity } from '@modules/message/dto/output/entity/message-group.entity';

@ObjectType()
export class MessageGroupEntitiesOutput extends PagingOutput(
  MessageGroupEntity,
) {}
