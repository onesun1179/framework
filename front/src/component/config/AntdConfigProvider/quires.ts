import { gql, TypedDocumentNode } from "@apollo/client";
import { MessagesOutput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const MESSAGE_ENTITIES_CONFIG_QUERY = gql`
	query MESSAGE_ENTITIES_CONFIG_QUERY {
		messages(
			messagesInput: { search: { groupCode: { equal: { value: "FVM" } } } }
		) {
			list {
				code
				text
			}
		}
	}
` as TypedDocumentNode<{
	messages: MessagesOutput;
}>;

export const useMessageEntitiesConfigQuery = makeUseQuery(
	MESSAGE_ENTITIES_CONFIG_QUERY
);
