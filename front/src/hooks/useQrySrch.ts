import { SearchQueryKeyType, UtilTable } from "@src/Util";
import { useCallback, useMemo } from "react";
import { ColumnType } from "antd/es/table";
import { SortTypeInput } from "@gqlType";
import { invert } from "lodash";
import { useQueryObj } from "@src/hooks/useQueryObj";
import { Nullable } from "@src/types";

export function useQrySrch<
	SrchKey extends SearchQueryKeyType,
	ColKey extends string
>(qryKeyMap: Record<SrchKey, ColKey>) {
	const [keys, cols, map] = useMemo(
		() => [
			Object.keys(qryKeyMap) as Array<SrchKey>,
			Object.values(qryKeyMap) as Array<ColKey>,
			invert(qryKeyMap) as Record<ColKey, SrchKey>,
		],
		[qryKeyMap]
	);
	const { queryObj, setQueryObj, searchParams, setSearchParams } =
		useQueryObj();

	const srchMap = useMemo(() => {
		return UtilTable.toSortInputType(queryObj, qryKeyMap) as Record<
			ColKey,
			Nullable<SortTypeInput>
		>;
	}, [queryObj]);

	const getColumnSrch = useCallback((column: ColumnType<any>) => {}, [srchMap]);

	return null;
}
