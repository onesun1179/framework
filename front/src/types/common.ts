export type ValueOf<T> = T[keyof T];
export type Nullable<T> = T | null;
export type QueryObj<K extends string = string> = Record<K, string>;

export type PartialRecord<K extends keyof any, T> = {
	[P in K]?: T;
};
export type EntityFormActionType = "update" | "insert";
export type Func<T = any> = (...args: any[]) => T;
export type SqlSortType = "ASC" | "DESC";
export type Nil = undefined | null;
