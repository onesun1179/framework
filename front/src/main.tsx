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
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FrontComponent, Route as GqlRoute } from "@gqlType";
import { COMPONENT, ROUTE_COMPONENT } from "@src/constants/component.constant";
import {
	IndexRouteObject,
	NonIndexRouteObject,
} from "react-router/dist/lib/context";
import { onErrorLink } from "./graphql/errorHandling";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	connectToDevTools: true,
	link: ApolloLink.from([
		onErrorLink,
		new HttpLink({
			uri: `${import.meta.env.VITE_API_PATH}/graphql`,
		}),
	]),
});

const ROUTES_QUERY = gql`
	query {
		rootRoutes {
			seqNo
			path
			frontComponent {
				name
			}
			children {
				seqNo
				path
				frontComponent {
					name
				}
				children {
					seqNo
					path
					frontComponent {
						name
					}
				}
			}
		}
	}
`;

type RouteType = Pick<GqlRoute, "seqNo" | "path"> & {
	frontComponent: Pick<FrontComponent, "name">;
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
		...ROUTE_COMPONENT[routeType.frontComponent.name],
		path: routeType.path,
		element: createElement(COMPONENT[routeType.frontComponent.name]),
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
