import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { MessageGroupEntity } from '@modules/message/entity';

@ObjectType()
export class MessageGroupsOutput extends PagingOutput(MessageGroupEntity) {}