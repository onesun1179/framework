import { Type } from '@nestjs/common';

export type ValueOf<T> = T[keyof T];
export type Nullable<T> = T | null;
export type Func<T = any> = (...args: any[]) => T;
export type SqlSortType = 'ASC' | 'DESC';

export interface MappedType<T> extends Type<T> {
  new (): T;
}
