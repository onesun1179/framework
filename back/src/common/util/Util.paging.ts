import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { PagingInput } from '@common/dto/input/paging.input';
import { Type } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { Nullable } from 'src/common/type';

export class UtilPaging {
  static async getRes<Entity extends ObjectLiteral>(p: {
    builder: SelectQueryBuilder<Entity>;
    pagingInput?: Nullable<PagingInput>;
  }): Promise<{
    list: Entity[];
    total: number;
  }>;
  static async getRes<Entity extends ObjectLiteral>(p: {
    builder: SelectQueryBuilder<Entity>;
    classRef: Type;
    pagingInput?: Nullable<PagingInput>;
  }): Promise<Type>;
  static async getRes<Entity extends ObjectLiteral>({
    builder,
    classRef,
    pagingInput,
  }: {
    builder: SelectQueryBuilder<Entity>;
    classRef?: Type;
    pagingInput?: Nullable<PagingInput>;
  }): Promise<
    | {
        list: Entity[];
        total: number;
      }
    | Type
  > {
    const [list, total] = await builder
      .skip(pagingInput?.skip || undefined)
      .take(pagingInput?.take || undefined)
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
