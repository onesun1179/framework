import { PagingInput } from '@common/dto/input/paging.input';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { Nullable } from 'src/common/type';
import { UtilSearch } from '@common/util/Util.search';
import { EntityRepository } from '@common/repository/entity.repository';
import { MessageEntity } from '@modules/message/dto/output/entity/message.entity';
import { MessageEntitiesInput } from '@modules/message/dto/input/message-entities.input';
import { MessageEntitiesOutput } from '@modules/message/dto/output/message-entities.output';
import { UtilPaging } from '@common/util/Util.paging';
import { InsertMessageEntityInput } from '@modules/message/dto/input/insert-message-entity.input';
import { UpdateMessageEntityInput } from '@modules/message/dto/input/update-message-entity.input';
import { isNumber } from 'lodash';
import { UtilSort } from '@common/util/Util.sort';

@CustomRepository(MessageEntity)
export class MessageEntityRepository extends EntityRepository<MessageEntity> {
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
    messagesInput: Nullable<MessageEntitiesInput>,
  ): Promise<MessageEntitiesOutput> {
    const qb = this.createQueryBuilder('m');

    if (messagesInput) {
      const { search, sort } = messagesInput;

      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: MessageEntitiesOutput,
    });
  }

  async saveCustom(
    p: InsertMessageEntityInput | UpdateMessageEntityInput,
  ): Promise<MessageEntity> {
    if (p instanceof UpdateMessageEntityInput) {
      return this.save(
        MessageEntity.create({
          seqNo: p.seqNo,
          text: p.text,
          name: p.name,
          desc: p.desc,
        }),
      );
    } else {
      return this.save(
        MessageEntity.create({
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
