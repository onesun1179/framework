import {
	ApolloCache,
	DefaultContext,
	OperationVariables,
} from "@apollo/client/core";
import { TypedDocumentNode, useMutation } from "@apollo/client";
import { MutationHookOptions } from "@apollo/client/react/types/types";

export function makeUseMutation<
	TData = any,
	TVariables = OperationVariables,
	TContext = DefaultContext,
	TCache extends ApolloCache<any> = ApolloCache<any>
>(documentNode: TypedDocumentNode<TData, TVariables>) {
	return (options?: MutationHookOptions<TData, TVariables, TContext, TCache>) =>
		useMutation(documentNode, options);
}
