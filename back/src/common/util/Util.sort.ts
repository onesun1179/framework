import { SortEnum } from '@common/enum/sort.enum';
import { FindOptionsOrder } from 'typeorm';
import { Type } from '@nestjs/common';

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
}
