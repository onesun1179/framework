import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MessageService } from '@modules/message/service';
import { MessageEntity, MessageGroupEntity } from '@modules/message/entity';
import { Inject, Logger, UseGuards } from '@nestjs/common';

import { DataSource } from 'typeorm';
import { PagingInput } from '@common/dto/input/paging.input';
import {
  MessageGroupRepository,
  MessageRepository,
} from '@modules/message/repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';
import { MessagesOutput } from '@modules/message/dto/output';
import {
  InsertMessageInput,
  MessagesInput,
  UpdateMessageInput,
} from '@modules/message/dto/input';

@Resolver(() => MessageEntity)
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
  @Query(() => MessageEntity)
  async messageBySeqNo(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<MessageEntity> {
    return this.messageRepository.findOneOrFail({
      where: {
        seqNo,
      },
    });
  }

  @Query(() => MessageEntity)
  async messageByCode(
    @Args('groupCode', {
      type: () => String,
    })
    groupCode: string,
    @Args('code', {
      type: () => String,
    })
    code: string,
  ): Promise<MessageEntity> {
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

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => MessageGroupEntity)
  async group(@Parent() { groupCode, group }: MessageEntity) {
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
  @Mutation(() => MessageEntity)
  async updateMessage(
    @Args('updateMessageInput', {
      type: () => UpdateMessageInput,
    })
    updateMessageInput: UpdateMessageInput,
  ): Promise<MessageEntity> {
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

  @Mutation(() => MessageEntity)
  async insertMessage(
    @Args('insertMessageInput', {
      type: () => InsertMessageInput,
    })
    insertMessageInput: InsertMessageInput,
  ): Promise<MessageEntity> {
    return await this.messageRepository.saveCustom(insertMessageInput);
  }

  @Mutation(() => Boolean)
  async deleteMessages(
    @Args('seqNos', {
      type: () => [Int],
    })
    seqNos: Array<MessageEntity['seqNo']>,
  ): Promise<boolean> {
    await Promise.all(
      seqNos.map((seqNo) => this.cache.del(`message|${seqNo}`)),
    );
    const r = await this.messageRepository.delete(seqNos);
    console.log(r);
    return true;
  }
}
