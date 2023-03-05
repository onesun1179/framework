import { onError } from "@apollo/client/link/error";

export const onErrorLink = onError(
	({ graphQLErrors, networkError, operation, forward }) => {
		if (networkError) {
			console.log({
				networkError,
			});
		} else if (graphQLErrors) {
			if (
				graphQLErrors.every((o) => {
					console.log("graphqlErrors", o);
					console.log(document.cookie);
					switch (o.extensions.code) {
						case "UNAUTHENTICATED":
							location.href = import.meta.env.VITE_LOGIN_URL;
							return false;
						default:
							return true;
					}
				})
			) {
				forward(operation);
			}
		}
	}
);
