import { isArray, isNil, isString, isUndefined } from "lodash";
import { Func, Nil } from "@src/types";

export type UpperYN = "Y" | "N";
export class UtilCommon {
	static isUpperYn(v: any): v is UpperYN {
		return isString(v) && ["Y", "N"].includes(v);
	}
	static toBool(v: UpperYN): boolean {
		return v === "Y";
	}
	static invokeIf<T>(condition: boolean, func: Func<T>): T | undefined {
		if (condition) {
			return func();
		}
	}

	static applyFuncWithArg<T>(arg: T, func: (arg: T) => any) {
		return func(arg);
	}

	static nilToNull<T, A, I>(
		arg: T,
		func: (arg: Exclude<T, Nil>) => A,
		initial?: I
	): A extends Promise<any> ? Promise<A> : A | I;

	static nilToNull<T, A, I>(
		arg: T,
		func: (arg: Exclude<T, Nil>) => A,
		initial: I
	) {
		return isNil(arg)
			? isUndefined(initial)
				? null
				: initial
			: func(arg as Exclude<T, Nil>);
	}

	static toArray<T>(arg: T | T[]): T[] {
		if (isArray(arg)) {
			return arg;
		} else {
			return [arg];
		}
	}
}
