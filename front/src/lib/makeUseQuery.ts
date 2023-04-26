import { OperationVariables } from "@apollo/client/core";
import { TypedDocumentNode, useQuery } from "@apollo/client";
import { QueryHookOptions } from "@apollo/client/react/types/types";

export function makeUseQuery<
	TData = any,
	TVariables extends OperationVariables = OperationVariables
>(data: TypedDocumentNode<TData, TVariables>) {
	return (options?: QueryHookOptions<TData, TVariables>) =>
		useQuery<TData, TVariables>(data, options);
}
