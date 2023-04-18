import { EntityRepository } from '@common/repository/entity.repository';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In, Like } from 'typeorm';
import { PagingInput } from '@common/dto/input/paging.input';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { Nullable } from 'src/common/type';
import { MessageGroupEntity } from '@modules/message/dto/output/entity/message-group.entity';
import { MessageGroupEntitiesInput } from '@modules/message/dto/input/message-group-entities.input';
import { MessageGroupEntitiesOutput } from '@modules/message/dto/output/message-group-entities.output';
import { UtilPaging } from '@common/util/Util.paging';
import { InsertMessageGroupEntityInput } from '@modules/message/dto/input/insert-message-group-entity.input';
import { UpdateMessageGroupEntityInput } from '@modules/message/dto/input/update-message-group-entity.input';

@CustomRepository(MessageGroupEntity)
export class MessageGroupEntityRepository extends EntityRepository<MessageGroupEntity> {
  static getWhereByMessageGroupsInput({
    codes,
    name,
    code,
  }: MessageGroupEntitiesInput): FindOptionsWhere<MessageGroupEntity> {
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
    messageGroupsInput?: Nullable<MessageGroupEntitiesInput>,
  ): Promise<MessageGroupEntitiesOutput> {
    return await UtilPaging.getRes<MessageGroupEntity>({
      pagingInput,
      builder: this.createQueryBuilder('mg').where(
        MessageGroupEntityRepository.getWhereByMessageGroupsInput(
          messageGroupsInput!,
        ),
      ),
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
      }),
    );
  }
}
