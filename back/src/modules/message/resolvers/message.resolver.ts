import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MessageService } from '../message.service';
import { Message } from '../models/Message';
import { Logger } from '@nestjs/common';
import { MessageGroup } from '../models/MessageGroup';
import { UpdateMessageRequest } from '../models/request/UpdateMessage.request';
import { InsertMessageRequest } from '../models/request/InsertMessage.request';
import { UtilField } from '@util/Util.field';

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
    return Message.findOneBy({
      seqNo,
    });
  }

  @ResolveField(() => MessageGroup, {
    description: UtilField.getFieldComment('message', 'group'),
  })
  messageGroup(@Parent() { seqNo }: Message) {
    return Message.findOne({
      select: ['messageGroup'],
      relations: {
        messageGroup: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.messageGroup);
  }

  @Mutation(() => Message, {
    description: UtilField.getFieldComment('msg', 'update'),
  })
  async updateMessage(
    @Args('UpdateMessageRequest', {
      type: () => UpdateMessageRequest,
    })
    updateMessageRequest: UpdateMessageRequest,
  ): Promise<Message> {
    const message = await Message.findOneBy({
      seqNo: updateMessageRequest.seqNo,
    });

    if (!message) {
      throw new Error();
    }

    return this.messageService.saveMessage(updateMessageRequest);
  }

  @Mutation(() => Message, {
    description: UtilField.getFieldComment('msg', 'insert'),
  })
  async insertMessage(
    @Args('InsertMessageRequest', {
      type: () => InsertMessageRequest,
    })
    insertMessageRequest: InsertMessageRequest,
  ): Promise<Message> {
    return this.messageService.saveMessage(insertMessageRequest);
  }
}
