import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MessageService } from '../services/message.service';
import { MessageGroup } from '../entities/message-group';
import { Message } from '../entities/message';

import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MessageGroupService } from '@modules/message/services/message-group.service';
import { PagedMessageGroups } from '@modules/message/dto/output/paged-message-groups';
import { PagingInput } from '@common/dto/inputs/paging.input';
import { MessageGroupsInput } from '@modules/message/dto/input/message-groups.input';
import { UpdateMessageGroupInput } from '@modules/message/dto/input/update-message-group.input';
import { InsertMessageGroupInput } from '@modules/message/dto/input/insert-message-group.input';
import { MessageGroupRepository } from '@modules/message/repositories/message-group.repository';
import { Logger } from '@nestjs/common';
import { GqlError } from '@common/errors/GqlError';
import { MsgCode } from '@modules/message/dto/msg-code';

@Resolver(() => MessageGroup)
export class MessageGroupResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly messageGroupService: MessageGroupService,
    private readonly messageGroupRepository: MessageGroupRepository,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  private readonly logger = new Logger(MessageGroupResolver.name);

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => MessageGroup)
  messageGroup(
    @Args('code', {
      type: () => String,
    })
    code: MessageGroup['code'],
  ) {
    return MessageGroup.findOneBy({
      code,
    });
  }

  @Query(() => PagedMessageGroups)
  async messageGroups(
    @Args('paging', {
      type: () => PagingInput,
      nullable: true,
    })
    paging: PagingInput,
    @Args('request', {
      type: () => MessageGroupsInput,
      nullable: true,
    })
    req: MessageGroupsInput,
  ): Promise<PagedMessageGroups> {
    return await this.messageGroupRepository.paging(paging, req);
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => [Message])
  messages(@Parent() { code }: MessageGroup) {
    return this.dataSource.transaction(async (e) => {
      return await e
        .createQueryBuilder(Message, 'm')
        .where(`m.groupCode = :code`, {
          code,
        })
        .getMany();
    });
  }

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => MessageGroup, {
    nullable: true,
  })
  async updateMessageGroup(
    @Args('updateMessageGroupInput', {
      type: () => UpdateMessageGroupInput,
    })
    updateMessageGroupInput: UpdateMessageGroupInput,
  ): Promise<MessageGroup | null> {
    if (
      await this.messageGroupRepository.hasRow(updateMessageGroupInput.code)
    ) {
      return this.messageGroupRepository.saveCustom(updateMessageGroupInput);
    }
    return null;
  }

  @Mutation(() => MessageGroup)
  async insertMessageGroup(
    @Args('insertMessageGroupInput', {
      type: () => InsertMessageGroupInput,
    })
    insertMessageGroupInput: InsertMessageGroupInput,
  ): Promise<MessageGroup> {
    if (
      await this.messageGroupRepository.hasRow(insertMessageGroupInput.code)
    ) {
      throw new GqlError(new MsgCode('E', '0009'));
    } else {
      return this.messageGroupRepository.saveCustom(insertMessageGroupInput);
    }
  }
}
