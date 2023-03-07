import React, { createElement } from "react";
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
import { onErrorLink } from "./graphql/errorHandling";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FrontComponent, Route as GqlRoute } from "@gqlType";
import { COMPONENT, ROUTE_COMPONENT } from "@src/constants/component.constant";
import {
	IndexRouteObject,
	NonIndexRouteObject,
} from "react-router/dist/lib/context";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	connectToDevTools: true,
	link: ApolloLink.from([
		onErrorLink,
		new HttpLink({
			uri: import.meta.env.VITE_API_PATH + "/graphql",
		}),
	]),
});

const ROUTES_QUERY = gql`
	query {
		routes {
			path
			id
			frontComponent {
				id
			}
			children {
				path
				id
				frontComponent {
					id
				}
				children {
					path
					id
					frontComponent {
						id
					}
					children {
						path
						id
						frontComponent {
							id
						}
					}
				}
			}
		}
	}
`;

type RouteType = Pick<GqlRoute, "path" | "id"> & {
	frontComponent: Pick<FrontComponent, "id">;
	children: Array<RouteType>;
};

const { data } = await client.query<{
	routes: Array<RouteType>;
}>({
	query: ROUTES_QUERY,
});
function makeRouteObject(routeType: RouteType): IndexRouteObject;
function makeRouteObject(routeType: RouteType): NonIndexRouteObject;
function makeRouteObject(routeType: RouteType): any {
	return {
		...ROUTE_COMPONENT[routeType.frontComponent.id],
		path: routeType.path,
		element: createElement(COMPONENT[routeType.frontComponent.id]),
		children: routeType.children.map((o) => makeRouteObject(o)),
	};
}
const router = createBrowserRouter(data.routes.map((o) => makeRouteObject(o)));

console.log({ router });
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ApolloProvider client={client}>
		<RouterProvider router={router} />
	</ApolloProvider>
);
