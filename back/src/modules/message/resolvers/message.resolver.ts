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
import { Logger } from '@nestjs/common';
import { MessageGroup } from '../entities/message-group';

import { MessagesInput } from '@modules/message/dto/input/messages.input';
import { DataSource } from 'typeorm';
import { PagingInput } from '@common/dto/inputs/paging.input';
import { PagedMessages } from '@modules/message/dto/output/paged-messages';
import { UpdateMessageInput } from '@modules/message/dto/input/update-message.input';
import { InsertMessageInput } from '@modules/message/dto/input/insert-message.input';
import { MessageRepository } from '@modules/message/repositories/message.repository';
import { MessageGroupRepository } from '@modules/message/repositories/message-group.repository';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    private dataSource: DataSource,
    private messageRepository: MessageRepository,
    private messageGroupRepository: MessageGroupRepository,
  ) {}
  private readonly logger = new Logger(MessageResolver.name);

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => Message, {
    nullable: true,
  })
  message(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: Message['seqNo'],
  ): Promise<Message | null> {
    return this.messageRepository
      .createQueryBuilder(`message`)
      .where(`message.seqNo = :seqNo`, { seqNo })
      .getOne();
  }

  @Query(() => PagedMessages)
  async messages(
    @Args('paging', {
      type: () => PagingInput,
      nullable: true,
    })
    paging?: PagingInput,
    @Args('request', {
      type: () => MessagesInput,
      nullable: true,
    })
    req?: MessagesInput,
  ): Promise<PagedMessages> {
    console.log({
      paging,
      req,
    });
    return await this.messageRepository.paging(paging, req);
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => MessageGroup)
  async group(@Parent() { code }: Message) {
    return await this.dataSource.transaction(async (entityManager) => {
      return await entityManager
        .createQueryBuilder(MessageGroup, 'mg')
        .where(`mg.code = :code`, {
          code,
        })
        .getOne();
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
  ): Promise<Message | null> {
    if (await this.messageRepository.hasRow(updateMessageInput.seqNo)) {
      return this.messageRepository.saveCustom(updateMessageInput);
    }
    return null;
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
    await this.messageRepository.delete(seqNos);
    return true;
  }
}
