import { gql, TypedDocumentNode } from "@apollo/client";
import { RouteOutput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const ROUTE_DETAILS_QUERY = gql`
	query ROUTE_DETAILS($routeSeqNo: Int!) {
		route(seqNo: $routeSeqNo) {
			seqNo
			path
			parentSeqNo
			frontComponentId
			treeInfo {
				depth
				childCount
				fullPath
			}
			desc
			updatedAt
			createdAt
		}
	}
` as TypedDocumentNode<
	{
		route: Pick<
			RouteOutput,
			| "seqNo"
			| "path"
			| "parentSeqNo"
			| "frontComponentId"
			| "desc"
			| "updatedAt"
			| "createdAt"
			| "treeInfo"
		>;
	},
	{
		routeSeqNo: number;
	}
>;

export const useRouteDetailsQuery = makeUseQuery(ROUTE_DETAILS_QUERY);
