import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { MessageEntity } from '@modules/message/dto/output/entity/message.entity';

@ObjectType()
export class MessageEntitiesOutput extends PagingOutput(MessageEntity) {}
