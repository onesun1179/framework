import { BaseEntity, FindOneOptions, Repository } from 'typeorm';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { isArray } from 'lodash';
import { UtilCommon } from '@util/Util.common';

export class EntityRepository<
  Entity extends BaseEntity,
> extends Repository<Entity> {
  constructor(
    target: EntityTarget<Entity>,
    manager: EntityManager,
    queryRunner?: QueryRunner,
  ) {
    super(target, manager, queryRunner);
  }

  findOneOrFail(options: FindOneOptions<Entity>): Promise<Entity> {
    return super.findOne(options).then((r) => {
      if (!r) throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
      return r;
    });
  }

  findOneByOrFail(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<Entity> {
    return super.findOneBy(where).then((r) => {
      if (!r) throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
      return r;
    });
  }

  async updateOrFail(
    entity: Entity,
    uniqueKey: Array<keyof Entity> | keyof Entity,
  ): Promise<Entity> {
    if (
      super.hasId(entity) &&
      (await super.exist({
        where: isArray(uniqueKey)
          ? uniqueKey.reduce(
              (r, key) => ({
                ...r,
                [key]: entity[key],
              }),
              {},
            )
          : {
              [uniqueKey]: entity[uniqueKey],
            },
      }))
    ) {
      return await this.save(entity);
    } else {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
    }
  }

  async deleteOrFail(
    entity: Entity,
    uniqueKey: Array<keyof Entity> | keyof Entity,
  ): Promise<void> {
    if (
      super.hasId(entity) &&
      (await super.exist({
        where: UtilCommon.toArray(uniqueKey).reduce(
          (r, key) => ({
            ...r,
            [key]: entity[key],
          }),
          {},
        ),
      }))
    ) {
      await this.delete(this.getId(entity));
    } else {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
    }
  }
}
