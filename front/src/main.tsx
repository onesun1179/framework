import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	gql,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NonIndexRouteObject } from "react-router/dist/lib/context";
import { onErrorLink } from "./graphql/errorHandling";
import FrontCRoute from "@src/component/common/FrontCRoute";
import { RouteEntity, RoutesOutput } from "@gqlType";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	connectToDevTools: true,
	link: ApolloLink.from([
		onErrorLink,
		new HttpLink({
			uri: `${location.origin}/graphql`,
		}),
	]),
});

const ROUTES_QUERY = gql`
	query ROUTES {
		routes(request: { search: { parentSeqNo: { isNull: true } } }) {
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
`;

type RouteType = RouteEntity & {
	children: Array<RouteType>;
};

const { data } = await client.query<{
	routes: RoutesOutput;
}>({
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

const router = createBrowserRouter(
	data.routes.list.map((o) => makeRouteObject(o))
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ApolloProvider client={client}>
		<RouterProvider router={router} />
	</ApolloProvider>
);
