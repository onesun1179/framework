import { EntityRepository } from '@common/repository/entity.repository';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In, Like } from 'typeorm';
import { PagingInput } from '@common/dto/input/paging.input';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { Nullable } from 'src/common/type';
import { MessageGroupEntity } from '@modules/message/entity/message-group.entity';
import { MessageGroupsInput } from '@modules/message/dto/input/message-groups.input';
import { MessageGroupsOutput } from '@modules/message/dto/output/message-groups.output';
import { UtilPaging } from '@common/util/Util.paging';
import { InsertMessageGroupInput } from '@modules/message/dto/input/insert-message-group.input';
import { UpdateMessageGroupInput } from '@modules/message/dto/input/update-message-group.input';

@CustomRepository(MessageGroupEntity)
export class MessageGroupRepository extends EntityRepository<MessageGroupEntity> {
  static getWhereByMessageGroupsInput({
    codes,
    name,
    code,
  }: MessageGroupsInput): FindOptionsWhere<MessageGroupEntity> {
    const where: FindOptionsWhere<MessageGroupEntity> = {};

    code && (where.code = Like(`%${code}%`));
    codes && (where.code = In(codes));
    name && (where.name = Like(`%${name}%`));
    return where;
  }

  async hasRow(code: MessageGroupEntity['code']) {
    return (
      (await this.createQueryBuilder('mg')
        .where(`mg.code = :code`, {
          code,
        })
        .getCount()) > 0
    );
  }

  async paging(
    pagingInput?: Nullable<PagingInput>,
    messageGroupsInput?: Nullable<MessageGroupsInput>,
  ): Promise<MessageGroupsOutput> {
    return await UtilPaging.getRes<MessageGroupEntity>({
      pagingInput,
      builder: this.createQueryBuilder('mg').where(
        // @ts-ignore
        MessageGroupRepository.getWhereByMessageGroupsInput(messageGroupsInput),
      ),
      classRef: MessageGroupsOutput,
    });
  }

  async saveCustom(p: InsertMessageGroupInput | UpdateMessageGroupInput) {
    return await this.save(
      MessageGroupEntity.create({
        code: p.code,
        name: p.name,
      }),
    );
  }
}
