import { isString } from "lodash";

export type UpperYN = "Y" | "N";
export class UtilCommon {
	static isUpperYn(v: any): v is UpperYN {
		return isString(v) && ["Y", "N"].includes(v);
	}
	static toBool(v: UpperYN): boolean {
		return v === "Y";
	}
}
