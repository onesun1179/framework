import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import { ApolloProvider, gql, TypedDocumentNode } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NonIndexRouteObject } from "react-router/dist/lib/context";
import FrontCRoute from "@src/component/common/FrontCRoute";
import { apolloClient } from "@src/graphql/apolloClient";
import { RouteOutput, RoutesOutput } from "@gqlType";
import AntdConfigProvider from "@src/component/config/AntdConfigProvider";

const ROUTES_QUERY = gql`
	query ROUTES {
		routes(request: { search: { parentSeqNo: { isNull: { value: true } } } }) {
			list {
				seqNo
				parentSeqNo
				path
				treeInfo {
					depth
					fullPath
				}
				frontComponentId
				children {
					seqNo
					parentSeqNo
					path
					treeInfo {
						depth
						fullPath
					}
					frontComponentId
					children {
						seqNo
						parentSeqNo
						path
						treeInfo {
							depth
							fullPath
						}
						frontComponentId
						children {
							seqNo
							parentSeqNo
							path
							treeInfo {
								depth
								fullPath
							}
							frontComponentId
							children {
								seqNo
								parentSeqNo
								path
								treeInfo {
									depth
									fullPath
								}
								frontComponentId
								children {
									seqNo
									parentSeqNo
									path
									treeInfo {
										depth
										fullPath
									}
								}
							}
						}
					}
				}
			}
		}
	}
` as TypedDocumentNode<{
	routes: RoutesOutput;
}>;

type RouteType = RouteOutput & {
	children: Array<RouteType>;
};

const { data } = await apolloClient.query({
	query: ROUTES_QUERY,
});

function makeRouteObject(routeType: RouteType): NonIndexRouteObject {
	return {
		path: routeType.path,
		element: routeType.frontComponentId ? (
			<FrontCRoute frontComponentId={routeType.frontComponentId!} />
		) : null,
		handle: {
			frontComponentId: routeType.frontComponentId,
		},
		children: routeType.children.map((o) => makeRouteObject(o)),
	};
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ApolloProvider client={apolloClient}>
		<AntdConfigProvider>
			<RouterProvider
				router={createBrowserRouter(data.routes.list.map(makeRouteObject))}
			/>
		</AntdConfigProvider>
	</ApolloProvider>
);
