import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Inject, Logger, UseGuards } from '@nestjs/common';

import { DataSource } from 'typeorm';
import { PagingInput } from '@common/dto/input/paging.input';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';
import { MessageOutput } from '@modules/message/dto/output/entity/message.output';
import { MessageService } from '@modules/message/service/message.service';
import { MessageRepository } from '@modules/message/repository/message.repository';
import { MessageGroupRepository } from '@modules/message/repository/message-group.repository';
import { MessagesOutput } from '@modules/message/dto/output/messages.output';
import { MessagesInput } from '@modules/message/dto/input/messages.input';
import { MessageGroupOutput } from '@modules/message/dto/output/entity/message-group.output';
import { UpdateMessageInput } from '@modules/message/dto/input/update-message.input';
import { InsertMessageInput } from '@modules/message/dto/input/insert-message.input';
import { ChkUniqMessageByCodeInput } from '@modules/message/dto/input/chk-uniq-message-by-code.input';

@Resolver(() => MessageOutput)
@UseGuards(GqlAuthGuard)
export class MessageResolver {
  private readonly logger = new Logger(MessageResolver.name);

  constructor(
    private messageService: MessageService,
    private dataSource: DataSource,
    private messageRepository: MessageRepository,
    private messageGroupRepository: MessageGroupRepository,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => MessageOutput)
  async messageBySeqNo(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<MessageOutput> {
    return this.messageRepository.findOneOrFail({
      where: {
        seqNo,
      },
    });
  }

  @Query(() => MessageOutput)
  async messageByCode(
    @Args('groupCode', {
      type: () => String,
    })
    groupCode: string,
    @Args('code', {
      type: () => String,
    })
    code: string,
  ): Promise<MessageOutput> {
    return this.messageRepository.findOneOrFail({
      where: {
        groupCode,
        code,
      },
    });
  }

  @Query(() => MessagesOutput)
  async messages(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('messagesInput', {
      type: () => MessagesInput,
      nullable: true,
    })
    messagesInput: MessagesInput,
  ): Promise<MessagesOutput> {
    return await this.messageRepository.paging(pagingInput, messagesInput);
  }
  @Query(() => Boolean)
  async chkUniqMessageByCode(
    @Args('input', {
      type: () => ChkUniqMessageByCodeInput,
    })
    input: ChkUniqMessageByCodeInput,
  ): Promise<boolean> {
    return !(await this.messageRepository.exist({
      where: input,
    }));
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => MessageGroupOutput)
  async group(@Parent() { groupCode, group }: MessageOutput) {
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
  @Mutation(() => MessageOutput)
  async updateMessage(
    @Args('updateMessageInput', {
      type: () => UpdateMessageInput,
    })
    updateMessageInput: UpdateMessageInput,
  ): Promise<MessageOutput> {
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

  @Mutation(() => MessageOutput)
  async insertMessage(
    @Args('insertMessageInput', {
      type: () => InsertMessageInput,
    })
    insertMessageInput: InsertMessageInput,
  ): Promise<MessageOutput> {
    return await this.messageRepository.saveCustom(insertMessageInput);
  }

  @Mutation(() => Boolean)
  async deleteMessages(
    @Args('seqNos', {
      type: () => [Int],
    })
    seqNos: Array<number>,
  ): Promise<boolean> {
    await this.messageRepository.delete(seqNos);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteMessage(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<boolean> {
    await this.messageRepository.delete(seqNo);
    return true;
  }
}
