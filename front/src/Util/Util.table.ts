import { ColumnType } from "antd/es/table";

import { SortEnum, SortTypeInput } from "@gqlType";
import { entries, has, isInteger, isObject, isString } from "lodash";
import { Nullable, ValueOf } from "@src/types/common";
import { PartialRecord } from "@src/types";

export type SortValueType = Nullable<SortTypeInput>;
export type SortObjType<K extends string = string> = PartialRecord<
	K,
	SortValueType
>;
type ObjType = Record<string, any>;
type TitleMapType<O extends string = string> = Record<O, string>;

export type SortQueryKeyType = `sort_${string}`;
// export type SortQueryKeyType = string;
export type SortQueryValueType = `${SortEnum}|${number}`;
export type SortQueryObjType = Record<SortQueryKeyType, SortQueryValueType>;

export type SortQueryKeyMapType<
	T extends SortQueryKeyType = SortQueryKeyType,
	V extends string = string
> = Record<T, V>;

export type MakeColumnsColumns<O> = Array<
	Omit<ColumnType<O>, "key" | "dataIndex" | "sortOrder" | "sorter"> & {
		key: (keyof O & string) | string;
	}
>;

export type MakeColumnsOptions<
	O extends ObjType,
	S extends SortObjType<keyof O & string>
> = {
	sort?: {
		change: (key: keyof S) => void;
		map: S;
	};
};

export const UtilTable = {
	/**
	 * @example
	 * 		isSortQueryValueType(`ASC|1`)
	 * 			// true
	 *    isSortQueryValueType(`ASC`)
	 *      // false
	 */
	isSortQueryValueType(v: any): v is SortQueryValueType {
		if (isString(v)) {
			const [sort, order] = v.split("|");
			return (
				([SortEnum.ASC, SortEnum.DESC] as Array<string>).includes(sort) &&
				Number(order) > 0 &&
				isInteger(Number(order))
			);
		}
		return false;
	},
	/**
	 * @example
	 * 		isSortTypeInput({
	 * 			order : 1,
	 * 			sort : "ASC"
	 * 		})
	 * 			// true
	 *    isSortTypeInput({
	 *      order : 0,
	 *      sort : "ASC"
	 *    })
	 *      // false
	 */
	isSortTypeInput(v: any): v is SortTypeInput {
		if (isObject(v) && "order" in v && "sort" in v && isString(v.sort)) {
			const order = Number(v.order);
			if (
				isInteger(order) &&
				order > 0 &&
				([SortEnum.DESC, SortEnum.ASC] as Array<string>).includes(v.sort)
			) {
				return true;
			}
		}
		return false;
	},
	/**
	 * @example
	 * 		toSortTypeInput(`ASC|1`)
	 * 			// { sort : `ASC`, order : 1 }
	 *    toSortTypeInput(`2`)
	 *      // null
	 */
	toSortTypeInput(queryValue: any): Nullable<SortTypeInput> {
		if (this.isSortQueryValueType(queryValue)) {
			const [sort, order] = queryValue.split("|");
			return {
				sort: sort as SortEnum,
				order: Number(order),
			};
		}
		return null;
	},
	/**
	 * @example
	 * 		toSortQueryValue({ sort : `ASC`, order : 1 })
	 * 			// `ASC|1`
	 *    toSortQueryValue({ sort : `ASC`, order : 0 })
	 *      // null
	 */
	toSortQueryValue(sortTypeInput: any): Nullable<SortQueryValueType> {
		if (this.isSortTypeInput(sortTypeInput)) {
			return `${sortTypeInput.sort}|${sortTypeInput.order}`;
		}
		return null;
	},
	/**
	 * @example
	 * 		toSortTypeInputMap({
	 * 			sort_test: `ASC|1`
	 * 		}, {
	 * 		  sort_test: 'test'
	 * 		})
	 * 		// return
	 * 		{
	 * 		 test : {
	 * 		   sort: `ASC`,
	 * 		   order: 1
	 * 		 }
	 * 		}
	 */
	toSortInputType<
		Q extends SortQueryObjType,
		S extends SortQueryKeyMapType<keyof Q & SortQueryKeyType>
	>(queryObj: Partial<Q>, queryKeyMap: S): SortObjType<ValueOf<S> & string> {
		return entries(queryKeyMap).reduce((r, [k, v]) => {
			const key = queryObj[k as SortQueryKeyType];
			return {
				...r,
				[v]: key ? this.toSortTypeInput(key) : null,
			};
		}, {} as SortObjType<ValueOf<S> & string>);
	},

	makeColumns<O extends ObjType, S extends SortObjType<keyof O & string>>(
		columns: MakeColumnsColumns<O>,
		titleMap: TitleMapType<(keyof O & string) | string>,
		options?: MakeColumnsOptions<O, S>
	): Array<ColumnType<O>> {
		return columns.map((_o) => {
			const o = _o as ColumnType<O>;
			o.dataIndex = _o.key;

			_o.key in titleMap && (o.title = titleMap[_o.key]);
			if (options?.sort && has(options.sort.map, _o.key)) {
				o.sorter = {
					multiple: 1,
				};
				switch (options.sort.map[_o.key]?.sort) {
					case "ASC":
						o.sortOrder = "ascend";
						break;
					case "DESC":
						o.sortOrder = "descend";
						break;
					case null:
						o.sortOrder = undefined;
						break;
				}

				o.onHeaderCell = () => {
					return {
						onClick() {
							options.sort?.change!(_o.key);
						},
					};
				};
			}

			return o;
		});
	},
};
