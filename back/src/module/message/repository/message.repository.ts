import { PagingInput } from '@common/dto/input/paging.input';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { Nullable } from 'src/common/type';
import { UtilSearch } from '@common/util/Util.search';
import { EntityRepository } from '@common/repository/entity.repository';
import { MessageOutput } from '@modules/message/dto/output/entity/message.output';
import { MessagesInput } from '@modules/message/dto/input/messages.input';
import { MessagesOutput } from '@modules/message/dto/output/messages.output';
import { UtilPaging } from '@common/util/Util.paging';
import { InsertMessageInput } from '@modules/message/dto/input/insert-message.input';
import { UpdateMessageInput } from '@modules/message/dto/input/update-message.input';
import { isNumber } from 'lodash';
import { UtilSort } from '@common/util/Util.sort';

@CustomRepository(MessageOutput)
export class MessageRepository extends EntityRepository<MessageOutput> {
  async hasRow(seqNo: number, code?: string): Promise<boolean>;
  async hasRow(groupCode: string, code: string): Promise<boolean>;
  async hasRow(a1: number | string, a2?: string): Promise<boolean> {
    if (isNumber(a1))
      return this.exist({
        where: {
          seqNo: a1,
        },
      });
    else
      return this.exist({
        where: {
          groupCode: a1,
          code: a2,
        },
      });
  }
  async paging(
    pagingInput: Nullable<PagingInput>,
    messagesInput: Nullable<MessagesInput>,
  ): Promise<MessagesOutput> {
    const qb = this.createQueryBuilder('m');

    if (messagesInput) {
      const { search, sort } = messagesInput;

      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: MessagesOutput,
    });
  }

  async saveCustom(
    p: InsertMessageInput | UpdateMessageInput,
  ): Promise<MessageOutput> {
    if (p instanceof UpdateMessageInput) {
      return this.save(
        MessageOutput.create({
          seqNo: p.seqNo,
          text: p.text,
          name: p.name,
          desc: p.desc,
        }),
      );
    } else {
      return this.save(
        MessageOutput.create({
          text: p.text,
          code: p.code,
          name: p.name,
          groupCode: p.groupCode,
          desc: p.desc,
        }),
      );
    }
  }
}
