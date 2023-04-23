import { SortEnum } from '@common/enum/sort.enum';
import { FindOptionsOrder, SelectQueryBuilder } from 'typeorm';
import { Type } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { Nullable } from '@common/type';
import { SortTypeInput } from '@common/dto/input/sort-type.input';

export class UtilSort {
  static getFindOptionsOrder<Entity extends Type = any>(
    instance: any,
  ): FindOptionsOrder<Entity> {
    const _instance = instance as Record<keyof Entity, SortEnum | null>;

    return Object.entries(_instance).reduce((r, [k, sort]) => {
      if (!sort) {
        return r;
      }
      if (!Object.values(SortEnum).includes(sort as SortEnum)) {
        throw new Error();
      }

      return {
        ...r,
        [k]: sort,
      };
    }, {} as FindOptionsOrder<Entity>);
  }

  static setSortByQB<Entity extends ObjectLiteral>(
    qb: SelectQueryBuilder<Entity>,
    sort: ObjectLiteral,
  ) {
    return (Object.entries(sort) as Array<[string, Nullable<SortTypeInput>]>)
      .filter(([, o]) => !!o)
      .sort((a, b) => a[1]!.order - b[1]!.order)
      .forEach(([k, v], i) => {
        i === 0
          ? qb.orderBy(`${qb.alias}.${k}`, v?.sort)
          : qb.addOrderBy(`${qb.alias}.${k}`, v?.sort);
      });
  }
}
