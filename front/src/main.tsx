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
import { createBrowserRouter } from "react-router-dom";
import { FrontComponent, Route as GqlRoute } from "@gqlType";
import {
	IndexRouteObject,
	NonIndexRouteObject,
} from "react-router/dist/lib/context";
import { onErrorLink } from "./graphql/errorHandling";
import FrontC from "./component/common/FrontC";
import App from "@src/App";

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
		rootRoutes {
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
`;

type RouteType = Pick<GqlRoute, "seqNo" | "path"> & {
	frontComponent: Pick<FrontComponent, "id">;
	children: Array<RouteType>;
};

const { data } = await client.query<{
	rootRoutes: Array<RouteType>;
}>({
	query: ROUTES_QUERY,
});

console.log(data);
function makeRouteObject(routeType: RouteType): IndexRouteObject;
function makeRouteObject(routeType: RouteType): NonIndexRouteObject;
function makeRouteObject(
	routeType: RouteType
): IndexRouteObject | NonIndexRouteObject {
	return {
		path: routeType.path,
		element: <FrontC frontComponentId={routeType.frontComponent.id} />,
		children: routeType.children.map((o) => makeRouteObject(o)),
	};
}
const router = createBrowserRouter(
	data.rootRoutes.map((o) => makeRouteObject(o))
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ApolloProvider client={client}>
		<App router={router} />
	</ApolloProvider>
);
