import { SortEnum } from '@common/enum/sort.enum';
import { FindOptionsOrder, SelectQueryBuilder } from 'typeorm';
import { Type } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { SortTypeInput } from '@common/dto/input/sort-type.input';
import { SortClassType } from '@common/factory/sort-type';

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

  static getSort<S extends SortClassType>(sort: S) {
    return (Object.entries(sort) as Array<[keyof S, SortTypeInput]>)
      .filter(([, o]) => !!o)
      .sort((a, b) => a[1]!.order - b[1]!.order);
  }

  static setSortByQB<Entity extends ObjectLiteral, S extends SortClassType>(
    qb: SelectQueryBuilder<Entity>,
    sort: S,
  ) {
    return this.getSort(sort).forEach(([k, v], i) => {
      qb[i === 0 ? 'orderBy' : 'addOrderBy'](
        `${qb.alias}.${k as string}`,
        v?.sort,
      );
    });
  }
}
