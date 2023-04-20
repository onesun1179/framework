import { useLocation, useSearchParams } from "react-router-dom";
import querystring from "query-string";
import { useMemo } from "react";
import { isFunction, isNil, isObject, isString } from "lodash";
import { QueryObj } from "@src/types";

export const useQueryObj = <T extends Partial<QueryObj>>() => {
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();

	const queryObj = useMemo(
		() => querystring.parse(location.search) as T,
		[location.search]
	);

	function setQueryObj<A extends keyof T>(name: A, value?: T[A]): void;
	function setQueryObj(obj: T): void;
	function setQueryObj(func: (prev: T) => T): void;
	function setQueryObj(name: any, value?: any) {
		if (isFunction(name) || isObject(name)) {
			const obj = isFunction(name) ? name(queryObj) : name;
			const searchParams = new URLSearchParams();
			Object.entries(obj).forEach(([k, v]) => {
				isString(v) && searchParams.set(k, v as string);
			});
			setSearchParams(searchParams);
		} else {
			setSearchParams((p) => {
				if (isNil(value)) {
					p.delete(name as string);
				} else {
					p.set(name as string, value);
				}

				return p;
			});
		}
	}

	return {
		queryObj,
		setQueryObj,
		searchParams,
		setSearchParams,
	};
};
