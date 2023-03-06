import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ApolloProvider>
);
