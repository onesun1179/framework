import { Logger } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MessageGroupEntity } from '@modules/message/dto/output/entity/message-group.entity';
import { MessageService } from '../service/message.service';
import { MessageGroupService } from '@modules/message/service/message-group.service';
import { MessageGroupEntityRepository } from '@modules/message/repository/message-group-entity.repository';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { MessageGroupEntitiesOutput } from '@modules/message/dto/output/message-group-entities.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { MessageGroupEntitiesInput } from '@modules/message/dto/input/message-group-entities.input';
import { MessageEntity } from '@modules/message/dto/output/entity/message.entity';
import { UpdateMessageGroupEntityInput } from '@modules/message/dto/input/update-message-group-entity.input';
import { InsertMessageGroupEntityInput } from '@modules/message/dto/input/insert-message-group-entity.input';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { MessageEntityRepository } from '@modules/message/repository/message-entity.repository';

@Resolver(() => MessageGroupEntity)
export class MessageGroupEntityResolver {
  private readonly logger = new Logger(MessageGroupEntityResolver.name);

  constructor(
    private readonly messageService: MessageService,
    private readonly messageGroupService: MessageGroupService,
    private readonly messageGroupRepository: MessageGroupEntityRepository,
    private readonly messageEntityRepository: MessageEntityRepository,
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
    code: MessageGroupEntity['code'],
  ) {
    return !(await this.messageGroupRepository.exist({
      where: {
        code,
      },
    }));
  }
  @Query(() => MessageGroupEntity)
  messageGroupEntity(
    @Args('code', {
      type: () => String,
    })
    code: MessageGroupEntity['code'],
  ) {
    return MessageGroupEntity.findOneBy({
      code,
    });
  }

  @Query(() => MessageGroupEntitiesOutput)
  async messageGroupEntities(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('messageGroupEntitiesInput', {
      type: () => MessageGroupEntitiesInput,
      nullable: true,
    })
    messageGroupEntitiesInput: MessageGroupEntitiesInput,
  ): Promise<MessageGroupEntitiesOutput> {
    return await this.messageGroupRepository.paging(
      pagingInput,
      messageGroupEntitiesInput,
    );
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => [MessageEntity])
  messageEntities(@Parent() { code: groupCode }: MessageGroupEntity) {
    return this.messageEntityRepository.find({
      where: {
        groupCode,
      },
    });
  }

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => MessageGroupEntity, {
    nullable: true,
  })
  async updateMessageGroupEntity(
    @Args('updateMessageGroupEntityInput', {
      type: () => UpdateMessageGroupEntityInput,
    })
    updateMessageGroupEntityInput: UpdateMessageGroupEntityInput,
  ): Promise<MessageGroupEntity> {
    if (
      await this.messageGroupRepository.hasRow(
        updateMessageGroupEntityInput.code,
      )
    ) {
      return this.messageGroupRepository.saveCustom(
        updateMessageGroupEntityInput,
      );
    }
    throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
  }

  @Mutation(() => MessageGroupEntity)
  async insertMessageGroupEntity(
    @Args('insertMessageGroupEntityInput', {
      type: () => InsertMessageGroupEntityInput,
    })
    insertMessageGroupEntityInput: InsertMessageGroupEntityInput,
  ): Promise<MessageGroupEntity> {
    if (
      await this.messageGroupRepository.hasRow(
        insertMessageGroupEntityInput.code,
      )
    ) {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
    } else {
      return this.messageGroupRepository.saveCustom(
        insertMessageGroupEntityInput,
      );
    }
  }
}
