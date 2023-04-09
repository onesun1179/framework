import { EntityRepository } from '@common/repositories/entity.repository';
import { MessageGroup } from '@modules/message/entities/message-group';
import { MessageGroupsInput } from '@modules/message/dto/input/message-groups.input';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { DataSource, In, Like } from 'typeorm';
import { PagingInput } from '@common/dto/inputs/paging.input';
import { PagedMessageGroups } from '@modules/message/dto/output/paged-message-groups';
import { UtilPaging } from '@common/utils/util.paging';
import { InsertMessageGroupInput } from '@modules/message/dto/input/insert-message-group.input';
import { UpdateMessageGroupInput } from '@modules/message/dto/input/update-message-group.input';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageGroupRepository extends EntityRepository<MessageGroup> {
  constructor(private dataSource: DataSource) {
    super(MessageGroup, dataSource.createEntityManager());
  }

  static getWhereByMessageGroupsInput({
    codes,
    name,
    code,
  }: MessageGroupsInput): FindOptionsWhere<MessageGroup> {
    const where: FindOptionsWhere<MessageGroup> = {};

    code && (where.code = Like(`%${code}%`));
    codes && (where.code = In(codes));
    name && (where.name = Like(`%${name}%`));
    return where;
  }

  async hasRow(code: MessageGroup['code']) {
    return (
      (await this.createQueryBuilder('mg')
        .where(`mg.code = :code`, {
          code,
        })
        .getCount()) > 0
    );
  }

  async paging(
    pagingRequest: PagingInput,
    messageGroupsInput: MessageGroupsInput,
  ): Promise<PagedMessageGroups> {
    return await UtilPaging.getRes<MessageGroup>(
      pagingRequest,
      this.createQueryBuilder('mg').where(
        MessageGroupRepository.getWhereByMessageGroupsInput(messageGroupsInput),
      ),
      PagedMessageGroups,
    );
  }

  async saveCustom(p: InsertMessageGroupInput | UpdateMessageGroupInput) {
    return await this.save(
      MessageGroup.create({
        code: p.code,
        name: p.name,
      }),
    );
  }
}
