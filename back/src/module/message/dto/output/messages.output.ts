import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { MessageEntity } from '@modules/message/entity';

@ObjectType()
export class MessagesOutput extends PagingOutput(MessageEntity) {}
