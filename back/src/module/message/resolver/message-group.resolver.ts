import { Logger } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MessageGroupEntity } from '../entity/message-group.entity';
import { MessageService } from '../service/message.service';
import { MessageGroupService } from '@modules/message/service/message-group.service';
import { MessageGroupRepository } from '@modules/message/repository/message-group.repository';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { MessageGroupsOutput } from '@modules/message/dto/output/message-groups.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { MessageGroupsInput } from '@modules/message/dto/input/message-groups.input';
import { MessageEntity } from '@modules/message/entity/message.entity';
import { UpdateMessageGroupInput } from '@modules/message/dto/input/update-message-group.input';
import { InsertMessageGroupInput } from '@modules/message/dto/input/insert-message-group.input';
import { GqlError } from '@common/error/GqlError';
import { MsgCode } from '@modules/message/dto/msg-code';

@Resolver(() => MessageGroupEntity)
export class MessageGroupResolver {
  private readonly logger = new Logger(MessageGroupResolver.name);

  constructor(
    private readonly messageService: MessageService,
    private readonly messageGroupService: MessageGroupService,
    private readonly messageGroupRepository: MessageGroupRepository,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => MessageGroupEntity)
  messageGroup(
    @Args('code', {
      type: () => String,
    })
    code: MessageGroupEntity['code'],
  ) {
    return MessageGroupEntity.findOneBy({
      code,
    });
  }

  @Query(() => MessageGroupsOutput)
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
  ): Promise<MessageGroupsOutput> {
    return await this.messageGroupRepository.paging(paging, req);
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => [MessageEntity])
  messages(@Parent() { code }: MessageGroupEntity) {
    return this.dataSource.transaction(async (e) => {
      return await e
        .createQueryBuilder(MessageEntity, 'm')
        .where(`m.groupCode = :code`, {
          code,
        })
        .getMany();
    });
  }

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => MessageGroupEntity, {
    nullable: true,
  })
  async updateMessageGroup(
    @Args('updateMessageGroupInput', {
      type: () => UpdateMessageGroupInput,
    })
    updateMessageGroupInput: UpdateMessageGroupInput,
  ): Promise<MessageGroupEntity | null> {
    if (
      await this.messageGroupRepository.hasRow(updateMessageGroupInput.code)
    ) {
      return this.messageGroupRepository.saveCustom(updateMessageGroupInput);
    }
    return null;
  }

  @Mutation(() => MessageGroupEntity)
  async insertMessageGroup(
    @Args('insertMessageGroupInput', {
      type: () => InsertMessageGroupInput,
    })
    insertMessageGroupInput: InsertMessageGroupInput,
  ): Promise<MessageGroupEntity> {
    if (
      await this.messageGroupRepository.hasRow(insertMessageGroupInput.code)
    ) {
      throw new GqlError(new MsgCode('E', '0009'));
    } else {
      return this.messageGroupRepository.saveCustom(insertMessageGroupInput);
    }
  }
}
