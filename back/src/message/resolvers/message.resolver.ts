import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MessageService } from '../message.service';
import { Message } from '../models/Message';
import { Logger } from '@nestjs/common';
import { MessageGroup } from '../models/MessageGroup';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}
  private readonly logger = new Logger(MessageResolver.name);

  @Query(() => Message)
  message(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: Message['seqNo'],
  ) {
    return this.messageService.getMessageRepository().findOneBy({
      seqNo,
    });
  }

  @ResolveField(() => MessageGroup)
  messageGroup(@Parent() { seqNo }: Message) {
    return this.messageService
      .getMessageRepository()
      .findOne({
        select: ['messageGroup'],
        relations: {
          messageGroup: true,
        },
        where: {
          seqNo,
        },
      })
      .then((r) => r?.messageGroup);
  }
}
