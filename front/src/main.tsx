import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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
import { FrontComponent, Route as GqlRoute } from "@gqlType";
import { NonIndexRouteObject } from "react-router/dist/lib/context";
import { onErrorLink } from "./graphql/errorHandling";
import FrontC from "./component/common/FrontC";

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
	query {
		routes(rootYn: true) {
			seqNo
			path
			frontComponent {
				id
			}
			children {
				seqNo
				path
				frontComponent {
					id
				}
				children {
					seqNo
					path
					frontComponent {
						id
					}
					children {
						seqNo
						path
						frontComponent {
							id
						}
						children {
							seqNo
							path
							frontComponent {
								id
							}
							children {
								seqNo
								path
								frontComponent {
									id
								}
								children {
									seqNo
									path
									frontComponent {
										id
									}
									children {
										seqNo
										path
										frontComponent {
											id
										}
										children {
											seqNo
											path
											frontComponent {
												id
											}
										}
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

type RouteType = Pick<GqlRoute, "seqNo" | "path"> & {
	frontComponent?: Pick<FrontComponent, "id">;
	children: Array<RouteType>;
};

const { data } = await client.query<{
	routes: Array<RouteType>;
}>({
	query: ROUTES_QUERY,
});

console.log(data);
function makeRouteObject(routeType: RouteType): NonIndexRouteObject {
	return {
		path: routeType.path,
		element: <FrontC frontComponentId={routeType.frontComponent?.id} />,
		handle: {
			// crumb : () =>
		},
		children: routeType.children.map((o) => makeRouteObject(o)),
	};
}
const router = createBrowserRouter(data.routes.map((o) => makeRouteObject(o)));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ApolloProvider client={client}>
		<RouterProvider router={router} />
	</ApolloProvider>
);
