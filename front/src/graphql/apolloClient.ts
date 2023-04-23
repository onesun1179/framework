import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";
import { onErrorLink } from "@src/graphql/errorHandling";

export const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	connectToDevTools: true,
	link: ApolloLink.from([
		onErrorLink,
		new HttpLink({
			uri: `${location.origin}/graphql`,
		}),
	]),
});
