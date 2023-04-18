import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { FindOptionsOrder } from 'typeorm';
import { PagingInput } from '@common/dto/input/paging.input';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { Nullable } from 'src/common/type';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { EntityRepository } from '@common/repository/entity.repository';
import { MessageEntity } from '@modules/message/dto/output/entity/message.entity';
import { MessageEntitiesInput } from '@modules/message/dto/input/message-entities.input';
import { MessageEntitiesOutput } from '@modules/message/dto/output/message-entities.output';
import { UtilPaging } from '@common/util/Util.paging';
import { InsertMessageEntityInput } from '@modules/message/dto/input/insert-message-entity.input';
import { UpdateMessageEntityInput } from '@modules/message/dto/input/update-message-entity.input';

@CustomRepository(MessageEntity)
export class MessageEntityRepository extends EntityRepository<MessageEntity> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    messagesInput: Nullable<MessageEntitiesInput>,
  ): Promise<MessageEntitiesOutput> {
    const qb = this.createQueryBuilder('m');
    let order: FindOptionsOrder<MessageEntity> = {};
    let where: FindOptionsWhere<MessageEntity> = {};

    if (messagesInput) {
      const { search, sort } = messagesInput;

      if (search) {
        where = UtilSearch.getFindOptionsWhere(search);
        // const { seqNo, text, groupsInput } = search;
        // const seqNoWhere = seqNo ? UtilSearch.number(seqNo) : [];
        // const textWhere = text ? UtilSearch.string(text) : [];
        //
        // seqNoWhere.length > 0 && (where.seqNo = And(...seqNoWhere));
        // textWhere.length > 0 && text && (where.text = And(...textWhere));
      }

      if (sort) {
        order = UtilSort.getFindOptionsOrder(sort);
      }
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb.setFindOptions({
        where,
        order,
      }),
      classRef: MessageEntitiesOutput,
    });
  }

  async hasRow(seqNo: MessageEntity['seqNo']) {
    return (
      (await this.createQueryBuilder('m')
        .where(`m.seqNo = :seqNo`, {
          seqNo,
        })
        .getCount()) > 0
    );
  }

  async saveCustom(
    p: InsertMessageEntityInput | UpdateMessageEntityInput,
  ): Promise<MessageEntity> {
    return this.save(
      MessageEntity.create({
        seqNo: p instanceof UpdateMessageEntityInput ? p.seqNo : undefined,
        text: p.text,
        code: p.code,
        name: p.name,
        groupCode: p.groupCode,
      }),
    );
  }
}
