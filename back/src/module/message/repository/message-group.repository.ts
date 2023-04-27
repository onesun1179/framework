import { EntityRepository } from '@common/repository/entity.repository';
import { PagingInput } from '@common/dto/input/paging.input';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { Nullable } from 'src/common/type';
import { MessageGroupOutput } from '@modules/message/dto/output/entity/message-group.output';
import { MessageGroupsInput } from '@modules/message/dto/input/message-groups.input';
import { MessageGroupsOutput } from '@modules/message/dto/output/message-groups.output';
import { UtilPaging } from '@common/util/Util.paging';
import { InsertMessageGroupInput } from '@modules/message/dto/input/insert-message-group.input';
import { UpdateMessageGroupInput } from '@modules/message/dto/input/update-message-group.input';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';

@CustomRepository(MessageGroupOutput)
export class MessageGroupRepository extends EntityRepository<MessageGroupOutput> {
  async hasRow(code: MessageGroupOutput['code']) {
    return await this.exist({
      where: {
        code,
      },
    });
  }
  async paging(
    pagingInput?: Nullable<PagingInput>,
    messageGroupsInput?: Nullable<MessageGroupsInput>,
  ): Promise<MessageGroupsOutput> {
    const qb = this.createQueryBuilder('mg');

    if (messageGroupsInput) {
      const { search, sort } = messageGroupsInput;

      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: MessageGroupsOutput,
    });
  }

  async saveCustom(p: InsertMessageGroupInput | UpdateMessageGroupInput) {
    return await this.save(
      MessageGroupOutput.create({
        code: p.code,
        name: p.name,
        desc: p.desc,
      }),
    );
  }
}
