import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseQuery } from "@src/lib/makeUseQuery";
import { FrontComponentsOutput } from "@gqlType";

export const FRONT_COMPONENT_QUERY = gql`
	query FRONT_COMPONENTS {
		frontComponents {
			list {
				id
				name
			}
		}
	}
` as TypedDocumentNode<{
	frontComponents: FrontComponentsOutput;
}>;

export const useFrontComponentQuery = makeUseQuery(FRONT_COMPONENT_QUERY);
