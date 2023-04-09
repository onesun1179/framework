import { Message } from '@modules/message/entities/message';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { DataSource, In, Like, Repository } from 'typeorm';
import { UtilPaging } from '@common/utils/util.paging';
import { PagedMessages } from '@modules/message/dto/output/paged-messages';
import { PagingInput } from '@common/dto/inputs/paging.input';
import { MessagesInput } from '@modules/message/dto/input/messages.input';
import { MessageGroupRepository } from '@modules/message/repositories/message-group.repository';
import { InsertMessageInput } from '@modules/message/dto/input/insert-message.input';
import { UpdateMessageInput } from '@modules/message/dto/input/update-message.input';
import { CacheKey } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageRepository extends Repository<Message> {
  constructor(private dataSource: DataSource) {
    super(Message, dataSource.createEntityManager());
  }
  @CacheKey('test2')
  async paging(pagingRequest?: PagingInput, messagesInput?: MessagesInput) {
    const qb = this.createQueryBuilder('m');
    const where: FindOptionsWhere<Message> = {};

    if (messagesInput) {
      const { seqNos, text, groupsInput } = messagesInput;
      seqNos && (where.seqNo = In(seqNos));
      text && (where.text = Like(`%${text}%`));
      groupsInput &&
        (where.group =
          MessageGroupRepository.getWhereByMessageGroupsInput(groupsInput));
    }

    return await UtilPaging.getRes({
      pagingRequest: pagingRequest,
      builder: qb.where(where),
      classRef: PagedMessages,
    });
  }

  async hasRow(seqNo: Message['seqNo']) {
    return (
      (await this.createQueryBuilder('m')
        .where(`m.seqNo = :seqNo`, {
          seqNo,
        })
        .getCount()) > 0
    );
  }

  async saveCustom(
    p: InsertMessageInput | UpdateMessageInput,
  ): Promise<Message> {
    return this.save(
      Message.create({
        seqNo: p instanceof UpdateMessageInput ? p.seqNo : undefined,
        text: p.text,
        code: p.code,
        name: p.name,
        groupCode: p.groupCode,
      }),
    );
  }
}
