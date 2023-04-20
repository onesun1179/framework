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
import { MessageEntity } from '@modules/message/dto/output/entity/message.entity';
import { MessageService } from '@modules/message/service/message.service';
import { MessageEntityRepository } from '@modules/message/repository/message-entity.repository';
import { MessageGroupEntityRepository } from '@modules/message/repository/message-group-entity.repository';
import { MessageEntitiesOutput } from '@modules/message/dto/output/message-entities.output';
import { MessageEntitiesInput } from '@modules/message/dto/input/message-entities.input';
import { MessageGroupEntity } from '@modules/message/dto/output/entity/message-group.entity';
import { UpdateMessageEntityInput } from '@modules/message/dto/input/update-message-entity.input';
import { InsertMessageEntityInput } from '@modules/message/dto/input/insert-message-entity.input';
import { ChkUniqMessageByCodeInput } from '@modules/message/dto/input/chk-uniq-message-by-code.input';

@Resolver(() => MessageEntity)
@UseGuards(GqlAuthGuard)
export class MessageEntityResolver {
  private readonly logger = new Logger(MessageEntityResolver.name);

  constructor(
    private messageService: MessageService,
    private dataSource: DataSource,
    private messageRepository: MessageEntityRepository,
    private messageGroupRepository: MessageGroupEntityRepository,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => MessageEntity)
  async messageEntityBySeqNo(
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
  async messageEntityByCode(
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

  @Query(() => MessageEntitiesOutput)
  async messageEntities(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('messageEntitiesInput', {
      type: () => MessageEntitiesInput,
      nullable: true,
    })
    messageEntitiesInput: MessageEntitiesInput,
  ): Promise<MessageEntitiesOutput> {
    return await this.messageRepository.paging(
      pagingInput,
      messageEntitiesInput,
    );
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
  async updateMessageEntity(
    @Args('updateMessageEntityInput', {
      type: () => UpdateMessageEntityInput,
    })
    updateMessageEntityInput: UpdateMessageEntityInput,
  ): Promise<MessageEntity> {
    if (
      await this.messageRepository.exist({
        where: {
          seqNo: updateMessageEntityInput.seqNo,
        },
      })
    ) {
      return this.messageRepository.saveCustom(updateMessageEntityInput);
    } else {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
    }
  }

  @Mutation(() => MessageEntity)
  async insertMessageEntity(
    @Args('insertMessageEntityInput', {
      type: () => InsertMessageEntityInput,
    })
    insertMessageEntityInput: InsertMessageEntityInput,
  ): Promise<MessageEntity> {
    return await this.messageRepository.saveCustom(insertMessageEntityInput);
  }

  @Mutation(() => Boolean)
  async deleteMessageEntities(
    @Args('seqNos', {
      type: () => [Int],
    })
    seqNos: Array<number>,
  ): Promise<boolean> {
    await this.messageRepository.delete(seqNos);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteMessageEntity(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<boolean> {
    await this.messageRepository.delete(seqNo);
    return true;
  }
}
