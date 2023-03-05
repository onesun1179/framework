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
import { BrowserRouter } from "react-router-dom";
import { onErrorLink } from "./graphql/errorHandling";
import App from "@src/App";

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

const gqlPathList = gql`
	fragment PathRec on Path {
		id
		title
		pathname
		componentPath
	}
	query {
		pathList {
			...PathRec
			children {
				...PathRec
				children {
					...PathRec
					children {
						...PathRec
						children {
							...PathRec
						}
					}
				}
			}
		}
	}
`;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ApolloProvider>
);
