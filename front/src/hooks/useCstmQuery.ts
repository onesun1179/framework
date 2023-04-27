import { useQuery } from "@apollo/client";
import {
	DocumentNode,
	OperationVariables,
	TypedDocumentNode,
} from "@apollo/client/core";
import {
	QueryHookOptions,
	QueryResult,
} from "@apollo/client/react/types/types";

function useCstmQuery<
	TData = any,
	TVariables extends OperationVariables = OperationVariables
>(
	query: DocumentNode | TypedDocumentNode<TData, TVariables>,
	options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> & {
	_data: TData | undefined;
} {
	const data = useQuery<TData, TVariables>(query, options);
	return {
		...data,
		_data: data?.data || data?.previousData,
	};
}

export default useCstmQuery;
