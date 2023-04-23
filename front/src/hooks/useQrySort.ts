import { SortQueryKeyType, UtilTable } from "@src/Util";
import { useCallback, useMemo } from "react";
import { invert } from "lodash";
import { useQueryObj } from "@src/hooks/useQueryObj";
import { SortEnum, SortTypeInput } from "@gqlType";
import { Nullable } from "@src/types";
import { ColumnType } from "antd/es/table";

export function useQrySort<
	SrtKey extends SortQueryKeyType,
	ColKey extends string
>(qryKeyMap: Record<SrtKey, ColKey>) {
	const [keys, cols, map] = useMemo(
		() => [
			Object.keys(qryKeyMap) as Array<SrtKey>,
			Object.values(qryKeyMap) as Array<ColKey>,
			invert(qryKeyMap) as Record<ColKey, SrtKey>,
		],
		[qryKeyMap]
	);
	const { queryObj, setQueryObj, searchParams, setSearchParams } =
		useQueryObj();

	const sortMap = useMemo(() => {
		return UtilTable.toSortInputType(queryObj, qryKeyMap) as Record<
			ColKey,
			Nullable<SortTypeInput>
		>;
	}, [queryObj]);

	const click = useCallback(
		(col: ColKey) => {
			const sortInput = sortMap[col];

			keys.forEach(searchParams.delete.bind(searchParams));

			const arr = (Object.entries(sortMap) as Array<[ColKey, SortTypeInput]>)
				.filter((o) => !!o[1] && col !== o[0])
				.sort((a, b) => a[1]!.order - b[1]!.order)
				.map((o, i) => {
					o[1]!.order = i + 2;
					return o;
				});
			switch (sortInput?.sort) {
				case "ASC":
					arr.push([
						col,
						{
							sort: SortEnum.DESC,
							order: 1,
						},
					]);
					break;
				case "DESC":
					break;
				default:
					arr.push([
						col,
						{
							sort: SortEnum.ASC,
							order: 1,
						},
					]);
					break;
			}
			arr.forEach(([k, v]) => {
				const query = UtilTable.toSortQueryValue(v);
				query && searchParams.set(map[k], query);
			});
			setSearchParams(searchParams);
		},
		[sortMap, keys, searchParams, setSearchParams]
	);

	const getColumnSort = useCallback(
		(column: ColumnType<any>) => {
			if (cols.includes(column.key as ColKey)) {
				const colKey = column.key as ColKey;

				const sort = sortMap[colKey];

				column.sorter = {
					multiple: 1,
				};
				column.sortOrder =
					sort?.sort === SortEnum.ASC
						? "ascend"
						: sort?.sort === SortEnum.DESC
						? "descend"
						: undefined;

				column.onHeaderCell = () => {
					return {
						onClick() {
							click(colKey);
						},
					};
				};
			}
			return column;
		},
		[sortMap, click]
	);

	return {
		sortMap,
		click,
		getColumnSort,
	};
}
