import { Dispatch, SetStateAction, useState } from "react";
import { isObject } from "lodash";

export function useMentionsState<T extends object>(
	initialShowYn?: boolean,
	initialRecord?: T
): {
	record: T;
	setRecord: Dispatch<SetStateAction<T>>;
	setMentionsShowYn: Dispatch<SetStateAction<boolean>>;
	mentionsShowYn: boolean;
};
export function useMentionsState<T extends object>(
	initialShowYn: T
): {
	record: T;
	setRecord: Dispatch<SetStateAction<T>>;
	setMentionsShowYn: Dispatch<SetStateAction<boolean>>;
	mentionsShowYn: boolean;
};
export function useMentionsState<T extends object>(
	initialShowYn: boolean | T,
	initialRecord?: T
) {
	const [mentionsShowYn, setMentionsShowYn] = useState(
		typeof initialShowYn === "boolean" ? initialShowYn : false
	);
	const [record, setRecord] = useState(
		isObject(initialRecord)
			? initialRecord
			: isObject(initialShowYn)
			? initialShowYn
			: undefined
	);

	return {
		record,
		setRecord,
		setMentionsShowYn,
		mentionsShowYn,
	};
}
