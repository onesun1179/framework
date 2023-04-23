import { useState } from "react";
import { RequiredPagingInput } from "@src/Util";

export function usePaging(initialTake = 10) {
	const [take, setTake] = useState(initialTake);
	const [skip, setSkip] = useState(0);
	return {
		take,
		setTake,
		skip,
		setSkip,
		makeSkip: (pageNum: number) => (pageNum - 1) * take,
		pagingInput: {
			take,
			skip,
		} as RequiredPagingInput,
		setPagingInput(a: RequiredPagingInput) {
			setTake(a.take);
			setSkip(a.skip);
		},
		current: Math.floor(skip / take) + 1,
	};
}
