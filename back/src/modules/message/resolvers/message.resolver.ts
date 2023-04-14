import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MessageService } from '../services/message.service';
import { Message } from '../entities/message';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { MessageGroup } from '../entities/message-group';

import { MessagesInput } from '@modules/message/dto/input/messages.input';
import { DataSource } from 'typeorm';
import { PagingInput } from '@common/dto/inputs/paging.input';
import { PagedMessages } from '@modules/message/dto/output/paged-messages';
import { UpdateMessageInput } from '@modules/message/dto/input/update-message.input';
import { InsertMessageInput } from '@modules/message/dto/input/insert-message.input';
import { MessageRepository } from '@modules/message/repositories/message.repository';
import { MessageGroupRepository } from '@modules/message/repositories/message-group.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { GqlError } from '@common/errors/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';

@Resolver(() => Message)
@UseGuards(GqlAuthGuard)
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    private dataSource: DataSource,
    private messageRepository: MessageRepository,
    private messageGroupRepository: MessageGroupRepository,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}
  private readonly logger = new Logger(MessageResolver.name);

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => Message)
  async messageBySeqNo(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<Message> {
    return this.messageRepository.findOneOrFail({
      where: {
        seqNo,
      },
    });
  }

  @Query(() => Message)
  async messageByCode(
    @Args('groupCode', {
      type: () => String,
    })
    groupCode: string,
    @Args('code', {
      type: () => String,
    })
    code: string,
  ): Promise<Message> {
    return this.messageRepository.findOneOrFail({
      where: {
        groupCode,
        code,
      },
    });
  }

  @Query(() => PagedMessages)
  async messages(
    @Args('paging', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('request', {
      type: () => MessagesInput,
      nullable: true,
    })
    messagesInput: MessagesInput,
  ): Promise<PagedMessages> {
    return await this.messageRepository.paging(pagingInput, messagesInput);
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => MessageGroup)
  async group(@Parent() { groupCode, group }: Message) {
    if (group) {
      return group;
    }
    return this.messageGroupRepository.findOneByOrFail({
      code: groupCode,
    });
  }

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => Message)
  async updateMessage(
    @Args('updateMessageInput', {
      type: () => UpdateMessageInput,
    })
    updateMessageInput: UpdateMessageInput,
  ): Promise<Message> {
    if (
      await this.messageRepository.exist({
        where: {
          seqNo: updateMessageInput.seqNo,
        },
      })
    ) {
      return this.messageRepository.saveCustom(updateMessageInput);
    } else {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
    }
  }

  @Mutation(() => Message)
  async insertMessage(
    @Args('insertMessageInput', {
      type: () => InsertMessageInput,
    })
    insertMessageInput: InsertMessageInput,
  ): Promise<Message> {
    return await this.messageRepository.saveCustom(insertMessageInput);
  }
  @Mutation(() => Boolean)
  async deleteMessages(
    @Args('seqNos', {
      type: () => [Int],
    })
    seqNos: Array<Message['seqNo']>,
  ): Promise<boolean> {
    await Promise.all(
      seqNos.map((seqNo) => this.cache.del(`message|${seqNo}`)),
    );
    const r = await this.messageRepository.delete(seqNos);
    console.log(r);
    return true;
  }
}
