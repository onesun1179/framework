import { Message } from '@modules/message/entities/message';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { FindOptionsOrder } from 'typeorm';
import { UtilPaging } from '@common/utils/util.paging';
import { PagedMessages } from '@modules/message/dto/output/paged-messages';
import { PagingInput } from '@common/dto/inputs/paging.input';
import { MessagesInput } from '@modules/message/dto/input/messages.input';
import { InsertMessageInput } from '@modules/message/dto/input/insert-message.input';
import { UpdateMessageInput } from '@modules/message/dto/input/update-message.input';
import { CustomRepository } from '@common/docorator/CustomRepository';
import { Nullable } from '@common/types';
import { UtilSearch } from '@common/utils/Util.search';
import { UtilSort } from '@common/utils/Util.sort';
import { EntityRepository } from '@common/repositories/entity.repository';

@CustomRepository(Message)
export class MessageRepository extends EntityRepository<Message> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    messagesInput: Nullable<MessagesInput>,
  ): Promise<PagedMessages> {
    const qb = this.createQueryBuilder('m');
    let order: FindOptionsOrder<Message> = {};
    let where: FindOptionsWhere<Message> = {};

    if (messagesInput) {
      const { search, sort } = messagesInput;

      if (search) {
        where = UtilSearch.bulkSearch(search);
        // const { seqNo, text, groupsInput } = search;
        // const seqNoWhere = seqNo ? UtilSearch.number(seqNo) : [];
        // const textWhere = text ? UtilSearch.string(text) : [];
        //
        // seqNoWhere.length > 0 && (where.seqNo = And(...seqNoWhere));
        // textWhere.length > 0 && text && (where.text = And(...textWhere));
      }

      if (sort) {
        order = UtilSort.getFindOptionsOrder<Message>(sort);
      }
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb.setFindOptions({
        where,
        order,
      }),
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
