import { EntityRepository } from '@common/repository/entity.repository';
import { PagingInput } from '@common/dto/input/paging.input';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { Nullable } from 'src/common/type';
import { MessageGroupEntity } from '@modules/message/dto/output/entity/message-group.entity';
import { MessageGroupEntitiesInput } from '@modules/message/dto/input/message-group-entities.input';
import { MessageGroupEntitiesOutput } from '@modules/message/dto/output/message-group-entities.output';
import { UtilPaging } from '@common/util/Util.paging';
import { InsertMessageGroupEntityInput } from '@modules/message/dto/input/insert-message-group-entity.input';
import { UpdateMessageGroupEntityInput } from '@modules/message/dto/input/update-message-group-entity.input';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';

@CustomRepository(MessageGroupEntity)
export class MessageGroupEntityRepository extends EntityRepository<MessageGroupEntity> {
  async hasRow(code: MessageGroupEntity['code']) {
    return await this.exist({
      where: {
        code,
      },
    });
  }
  async paging(
    pagingInput?: Nullable<PagingInput>,
    messageGroupsInput?: Nullable<MessageGroupEntitiesInput>,
  ): Promise<MessageGroupEntitiesOutput> {
    const qb = this.createQueryBuilder('mg');

    if (messageGroupsInput) {
      const { search, sort } = messageGroupsInput;

      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: MessageGroupEntitiesOutput,
    });
  }

  async saveCustom(
    p: InsertMessageGroupEntityInput | UpdateMessageGroupEntityInput,
  ) {
    return await this.save(
      MessageGroupEntity.create({
        code: p.code,
        name: p.name,
        desc: p.desc,
      }),
    );
  }
}
