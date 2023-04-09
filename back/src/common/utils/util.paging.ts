import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { PagingInput } from '@common/dto/inputs/paging.input';
import { Type } from '@nestjs/common';
import { Builder } from 'builder-pattern';

export class UtilPaging {
  static async getRes<Entity extends ObjectLiteral>(p: {
    builder: SelectQueryBuilder<Entity>;
    pagingRequest?: PagingInput;
  }): Promise<{
    list: Entity[];
    total: number;
  }>;
  static async getRes<Entity extends ObjectLiteral>(p: {
    builder: SelectQueryBuilder<Entity>;
    classRef: Type;
    pagingRequest?: PagingInput;
  }): Promise<Type>;
  static async getRes<Entity extends ObjectLiteral>({
    builder,
    classRef,
    pagingRequest,
  }: {
    builder: SelectQueryBuilder<Entity>;
    classRef?: Type;
    pagingRequest?: PagingInput;
  }): Promise<
    | {
        list: Entity[];
        total: number;
      }
    | Type
  > {
    const [list, total] = await builder
      .skip(pagingRequest?.skip)
      .take(pagingRequest?.take)
      .getManyAndCount();

    if (classRef) {
      return Builder(classRef, {
        list,
        total,
      }).build();
    } else {
      return {
        list,
        total,
      };
    }
  }
}
