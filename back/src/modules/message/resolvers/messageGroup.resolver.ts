import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MessageService } from '../message.service';
import { MessageGroup } from '../models/MessageGroup';
import { Logger } from '@nestjs/common';
import { Message } from '../models/Message';
import { UpdateMessageGroupRequest } from '../models/request/UpdateMessageGroup.request';
import { InsertMessageGroupRequest } from '../models/request/InsertMessageGroup.request';
import { UtilField } from '@util/Util.field';

@Resolver(() => MessageGroup)
export class MessageGroupResolver {
  constructor(private readonly messageService: MessageService) {}
  private readonly logger = new Logger(MessageGroupResolver.name);

  @Query(() => MessageGroup)
  messageGroup(
    @Args('code', {
      type: () => String,
    })
    seqNo: MessageGroup['seqNo'],
  ) {
    return MessageGroup.findOneBy({
      seqNo,
    });
  }

  @ResolveField(() => [Message], {
    description: UtilField.getFieldComment('msg', 's'),
  })
  messages(@Parent() { seqNo }: MessageGroup) {
    return MessageGroup.findOne({
      select: ['messages'],
      relations: {
        messages: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.messages);
  }

  @Mutation(() => MessageGroup, {
    description: UtilField.getFieldComment('msg', 'group', 'update'),
  })
  async updateMessageGroup(
    @Args('UpdateMessageGroupRequest', {
      type: () => UpdateMessageGroupRequest,
    })
    updateMessageGroupRequest: UpdateMessageGroupRequest,
  ): Promise<MessageGroup> {
    const messageGroup = await MessageGroup.findOneBy({
      seqNo: updateMessageGroupRequest.seqNo,
    });

    if (!messageGroup) {
      throw new Error();
    }

    return this.messageService.saveMessageGroup(updateMessageGroupRequest);
  }

  @Mutation(() => MessageGroup, {
    description: UtilField.getFieldComment('msg', 'group', 'insert'),
  })
  async insertMessageGroup(
    @Args('InsertMessageGroupRequest', {
      type: () => InsertMessageGroupRequest,
    })
    insertMessageGroupRequest: InsertMessageGroupRequest,
  ): Promise<MessageGroup> {
    return this.messageService.saveMessageGroup(insertMessageGroupRequest);
  }
}
