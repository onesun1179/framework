import { Logger } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MessageGroupOutput } from '@modules/message/dto/output/entity/message-group.output';
import { MessageService } from '../service/message.service';
import { MessageGroupService } from '@modules/message/service/message-group.service';
import { MessageGroupRepository } from '@modules/message/repository/message-group.repository';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { MessageGroupsOutput } from '@modules/message/dto/output/message-groups.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { MessageGroupsInput } from '@modules/message/dto/input/message-groups.input';
import { MessageOutput } from '@modules/message/dto/output/entity/message.output';
import { UpdateMessageGroupInput } from '@modules/message/dto/input/update-message-group.input';
import { InsertMessageGroupInput } from '@modules/message/dto/input/insert-message-group.input';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { MessageRepository } from '@modules/message/repository/message.repository';

@Resolver(() => MessageGroupOutput)
export class MessageGroupResolver {
  private readonly logger = new Logger(MessageGroupResolver.name);

  constructor(
    private readonly messageService: MessageService,
    private readonly messageGroupService: MessageGroupService,
    private readonly messageGroupRepository: MessageGroupRepository,
    private readonly messageRepository: MessageRepository,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => Boolean)
  async enableMessageGroupOfCode(
    @Args('code', {
      type: () => String,
    })
    code: MessageGroupOutput['code'],
  ) {
    return !(await this.messageGroupRepository.exist({
      where: {
        code,
      },
    }));
  }
  @Query(() => MessageGroupOutput)
  messageGroup(
    @Args('code', {
      type: () => String,
    })
    code: MessageGroupOutput['code'],
  ) {
    return MessageGroupOutput.findOneBy({
      code,
    });
  }

  @Query(() => MessageGroupsOutput)
  async messageGroups(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('messageGroupsInput', {
      type: () => MessageGroupsInput,
      nullable: true,
    })
    messageGroupsInput: MessageGroupsInput,
  ): Promise<MessageGroupsOutput> {
    return await this.messageGroupRepository.paging(
      pagingInput,
      messageGroupsInput,
    );
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => [MessageOutput])
  messages(@Parent() { code: groupCode }: MessageGroupOutput) {
    return this.messageRepository.find({
      where: {
        groupCode,
      },
    });
  }

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => MessageGroupOutput, {
    nullable: true,
  })
  async updateMessageGroup(
    @Args('updateMessageGroupInput', {
      type: () => UpdateMessageGroupInput,
    })
    updateMessageGroupInput: UpdateMessageGroupInput,
  ): Promise<MessageGroupOutput> {
    if (
      await this.messageGroupRepository.hasRow(updateMessageGroupInput.code)
    ) {
      return this.messageGroupRepository.saveCustom(updateMessageGroupInput);
    }
    throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
  }

  @Mutation(() => MessageGroupOutput)
  async insertMessageGroup(
    @Args('insertMessageGroupInput', {
      type: () => InsertMessageGroupInput,
    })
    insertMessageGroupInput: InsertMessageGroupInput,
  ): Promise<MessageGroupOutput> {
    if (
      await this.messageGroupRepository.hasRow(insertMessageGroupInput.code)
    ) {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
    } else {
      return this.messageGroupRepository.saveCustom(insertMessageGroupInput);
    }
  }
}
