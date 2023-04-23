import { ColumnType } from "antd/es/table";

import {
	EqualStringSearchInput,
	IlikeStringSearchInput,
	IsNullStringSearchInput,
	LikeStringSearchInput,
	NonNullableAnyStringSearchInput,
	NonNullableInStringSearchInput,
	NullableAnyStringSearchInput,
	NullableInStringSearchInput,
	PagingInput,
	RegexStringSearchInput,
	SortEnum,
	SortTypeInput,
} from "@gqlType";
import { entries, has, isInteger, isObject, isString, split } from "lodash";
import { Nullable, ValueOf } from "@src/types/common";
import { PartialRecord } from "@src/types";
import { TableDropdownFilterString } from "@src/component/table/dropdown/TableDropdownFilterString";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import { UpperYN, UtilCommon } from "@src/Util/Util.common";

export type RequiredPagingInput = Required<PagingInput>;

type ObjType = Record<string, any>;
type TitleMapType<O extends string = string> = Record<O, string>;

// query
export type QueryKeyMapType<
	K extends string = string,
	V extends string = string
> = Record<K, V>;
export type QueryKeyType = string;
export type QueryValueType = string;
export type QueryObjType<
	K extends QueryKeyType = QueryKeyType,
	V extends QueryValueType = QueryValueType
> = Record<K, V>;
export type SortValueType = Nullable<SortTypeInput>;
// sort
export type SortQueryKeyType<K extends QueryKeyType = QueryKeyType> =
	`sort_${K}`;
export type SortObjType<K extends string = string> = PartialRecord<
	K,
	SortValueType
>;
export type SortQueryValueType = `${SortEnum}|${number}`;
export type SortQueryObjType<
	K extends SortQueryKeyType = SortQueryKeyType,
	V extends SortQueryValueType = SortQueryValueType
> = QueryObjType<K, V>;
export type SortQueryKeyMapType<
	T extends SortQueryKeyType = SortQueryKeyType,
	V extends string = string
> = QueryKeyMapType<T, V>;
// search
export type SearchQueryKeyType<K extends QueryKeyType = QueryKeyType> =
	`srch_${K}`;

export type SearchQueryValueStringType<
	T extends "regex" | "like" | "equal" | "ilike",
	V extends string,
	N extends "N" | "Y"
> = `${T}|${V}|${N}`;
export type SearchQueryValueNumberType<
	T extends "lessThan" | "moreThan",
	V extends string,
	N extends "N" | "Y"
> = `${T}|${V}|${N}`;
export type SearchQueryValueBetweenType<
	T extends "between",
	From extends string,
	To extends string,
	N extends "N" | "Y"
> = `${T}|${From}|${To}|${N}`;
export type SearchQueryValueType = string;
export type SearchQueryObjType<
	K extends SearchQueryKeyType = SearchQueryKeyType,
	V extends SearchQueryValueType = SearchQueryValueType
> = QueryObjType<K, V>;
export type SearchQueryKeyMapType<
	T extends SearchQueryKeyType = SearchQueryKeyType,
	V extends string = string
> = QueryKeyMapType<T, V>;

export type CustomColumnType<O> = Omit<
	ColumnType<O>,
	| "key"
	| "dataIndex"
	| "sortOrder"
	| "sorter"
	| "filterDropdown"
	| "filterIcon"
	| "onFilter"
	| "onFilterDropdownOpenChange"
> & {
	key: (keyof O & string) | string;
	search?:
		| {
				type: "string";
				onSearch: (value: string) => void;
		  }
		| {
				type: "number";
				onSearch: (value: number) => void;
		  };
};

export type MakeColumnsOptions<
	O extends ObjType,
	S extends SortObjType<keyof O & string>
> = {
	sort?: {
		qryObj: SortQueryObjType;
		change: (key: keyof S) => void;
		map: S;
	};
	search?: {
		qryObj: SearchQueryObjType;
	};
};

export const UtilTable = {
	makeColumns<O extends ObjType, S extends SortObjType<keyof O & string>>(
		columns: Array<CustomColumnType<O>>,
		titleMap: TitleMapType<(keyof O & string) | string>,
		options?: MakeColumnsOptions<O, S>
	): Array<ColumnType<O>> {
		return columns.map((_o) => {
			return {
				...this.toSortColumn(_o, titleMap[_o.key], options),
				...this.toSearchColumn(_o),
			};
		});
	},
	/**
	 * @example
	 *    isSortQueryKeyType(`sort_nm`)
	 *      // true
	 */
	isSortQueryKeyType(v: any): v is SortQueryKeyType {
		if (isString(v)) {
			const [sort, order] = v.split("_");

			return sort === "sort" && !!order;
		}
		return false;
	},
	/**
	 * @example
	 *    isSearchQueryKeyType(`search_nm`)
	 *      // true
	 */
	isSearchQueryKeyType(v: any): v is SearchQueryKeyType {
		if (isString(v)) {
			const [srch, order] = v.split("_");
			return srch === "srch" && !!order;
		}
		return false;
	},
	/**
	 * @example
	 *    isSortQueryValueType(`ASC|1`)
	 *      // true
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
	isSearchQueryValueType(v: any): v is SearchQueryValueType {
		return (
			this.isSearchQueryValueStringType(v) ||
			this.isSearchQueryValueNumberType(v)
		);
	},

	/**
	 * @example
	 *    isSearchQueryValueStringType(`regex|1|Y`)
	 *      // true
	 */
	isSearchQueryValueStringType(v: any): v is SortQueryValueType {
		if (isString(v)) {
			const [type, value, not] = split("|");
			const vArr = value.split(",");

			return (
				(UtilCommon.isUpperYn(not) &&
					["regex", "like", "equal", "ilike"].includes(type) &&
					vArr.length === 1) ||
				(["in", "any"].includes(type) && vArr.length > 0) ||
				(["isNull"].includes(type) && UtilCommon.isUpperYn(value))
			);
		}
		return false;
	},
	toSearchQueryValueStringType(
		v: any
	):
		| null
		| EqualStringSearchInput
		| RegexStringSearchInput
		| LikeStringSearchInput
		| IlikeStringSearchInput
		| NullableInStringSearchInput
		| NonNullableInStringSearchInput
		| NullableAnyStringSearchInput
		| NonNullableAnyStringSearchInput
		| IsNullStringSearchInput {
		if (this.isSearchQueryValueStringType(v)) {
			const [type, value, _not] = split("|") as [
				"regex" | "like" | "equal" | "ilike" | "in" | "any" | "isNull",
				string,
				UpperYN
			];

			const vArr = value.split(",");
			const not = UtilCommon.toBool(_not);
			switch (type) {
				case "regex":
					return {
						not,
						value,
					} as RegexStringSearchInput;
				case "like":
					return {
						not,
						value,
					} as LikeStringSearchInput;
				case "equal":
					return {
						not,
						value,
					} as EqualStringSearchInput;
				case "ilike":
					return {
						not,
						value,
					} as IlikeStringSearchInput;
				case "in":
					return {
						not,
						value: vArr,
					} as NonNullableInStringSearchInput | NullableInStringSearchInput;
				case "any":
					return {
						not,
						value: vArr,
					} as NonNullableAnyStringSearchInput | NullableAnyStringSearchInput;
				case "isNull":
					return {
						value: UtilCommon.toBool(value as UpperYN),
					} as IsNullStringSearchInput;
			}
		}
		return null;
	},
	/**
	 * @example
	 *    isSearchQueryValueNumberType(`equal|1|Y`)
	 *      // true
	 */
	isSearchQueryValueNumberType(v: any): v is SortQueryValueType {
		if (isString(v)) {
			const [type, v, not] = split("|");
			const vArr = v.split(",");

			if (vArr.map((o) => Number(o)).every((o) => isInteger(o))) {
				return (
					(UtilCommon.isUpperYn(not) &&
						["equal", "lessThan", "moreThan"].includes(type) &&
						vArr.length === 1) ||
					(["between"].includes(type) && vArr.length === 2) ||
					(["in", "any"].includes(type) && vArr.length > 0) ||
					(["isNull"].includes(type) && UtilCommon.isUpperYn(v))
				);
			}
		}
		return false;
	},

	/**
	 * @example
	 *    isSortTypeInput({
	 * 			order : 1,
	 * 			sort : "ASC"
	 * 		})
	 *      // true
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
	 *    toSortTypeInput(`ASC|1`)
	 *      // { sort : `ASC`, order : 1 }
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
	 *    toSortQueryValue({ sort : `ASC`, order : 1 })
	 *      // `ASC|1`
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
	 *    toSortTypeInputMap({
	 * 			sort_test: `ASC|1`
	 * 		}, {
	 * 		  sort_test: 'test'
	 * 		})
	 *    // return
	 *    {
	 * 		 test : {
	 * 		   sort: `ASC`,
	 * 		   order: 1
	 * 		 }
	 * 		}
	 */
	toSortInputType<
		Q extends QueryObjType,
		S extends SortQueryKeyMapType<keyof Q & SortQueryKeyType>
	>(queryObj: Partial<Q>, queryKeyMap: S): SortObjType<ValueOf<S> & string> {
		return entries(queryKeyMap).reduce((r, [k, v]) => {
			if (!this.isSortQueryKeyType(k)) {
				return r;
			}
			const key = queryObj[k as SortQueryKeyType];
			return {
				...r,
				[v]: key ? this.toSortTypeInput(key) : null,
			};
		}, {} as SortObjType<ValueOf<S> & string>);
	},

	toSortColumn<O extends ObjType, S extends SortObjType<keyof O & string>>(
		column: CustomColumnType<O>,
		title: string,
		options?: MakeColumnsOptions<O, S>
	): ColumnType<O> {
		const _column = column as ColumnType<O>;

		_column.dataIndex = column.key;
		_column.title = title;

		if (options?.sort && has(options.sort.map, column.key)) {
			_column.sorter = {
				multiple: 1,
			};
			switch (options.sort.map[column.key]?.sort) {
				case "ASC":
					_column.sortOrder = "ascend";
					break;
				case "DESC":
					_column.sortOrder = "descend";
					break;
				case null:
					_column.sortOrder = undefined;
					break;
			}

			_column.onHeaderCell = () => {
				return {
					onClick() {
						options.sort?.change!(column.key);
					},
				};
			};
		}
		return _column;
	},
	toSearchColumn<O extends ObjType>(
		column: CustomColumnType<O>
	): ColumnType<O> {
		if (column.key && column.search) {
			const searchAtr = column.search;
			return {
				...column,
				filterDropdown: (props) => {
					switch (searchAtr.type) {
						case "string":
							return (
								<TableDropdownFilterString
									onSearch={searchAtr.onSearch}
									dataIndex={column.key}
									{...props}
								/>
							);
					}
				},
				filterIcon: (filtered: boolean) => (
					<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
				),
			};
		} else {
			return column;
		}
	},
};
