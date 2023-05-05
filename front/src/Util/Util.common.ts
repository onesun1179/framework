import { isArray, isNil, isString } from "lodash";
import { Func } from "@src/types";

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

	static nilToNull<T, A>(
		arg: T,
		func: (arg: Exclude<T, null | undefined>) => A
	): A extends Promise<any> ? Promise<A> : A | null;

	static nilToNull<T, A>(
		arg: T,
		func: (arg: Exclude<T, null | undefined>) => A
	) {
		return isNil(arg) ? null : func(arg as Exclude<T, null | undefined>);
	}

	static toArray<T>(arg: T | T[]): T[] {
		if (isArray(arg)) {
			return arg;
		} else {
			return [arg];
		}
	}
}
