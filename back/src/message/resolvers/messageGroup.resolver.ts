import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MessageService } from '../message.service';
import { MessageGroup } from '../models/MessageGroup';
import { Logger } from '@nestjs/common';
import { Message } from '../models/Message';

@Resolver(() => MessageGroup)
export class MessageGroupResolver {
  constructor(private readonly messageService: MessageService) {}
  private readonly logger = new Logger(MessageGroupResolver.name);

  @Query(() => MessageGroup)
  messageGroup(
    @Args('code')
    code: MessageGroup['code'],
  ) {
    return this.messageService.getMessageGroupRepository().findOneBy({
      code,
    });
  }

  @ResolveField(() => [Message], {
    defaultValue: [],
  })
  messages(@Parent() { code }: MessageGroup) {
    return this.messageService
      .getMessageGroupRepository()
      .findOne({
        select: ['messages'],
        relations: {
          messages: true,
        },
        where: {
          code,
        },
      })
      .then((r) => r?.messages);
  }
}
