import { gql, TypedDocumentNode } from "@apollo/client";
import { MessagesOutput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const MESSAGE_GROUPS_QUERY = gql`
	query MESSAGE_GROUPS {
		messageGroups {
			list {
				name
				code
			}
		}
	}
` as TypedDocumentNode<{
	messageGroups: MessagesOutput;
}>;

export const useMessageGroupsQuery = makeUseQuery(MESSAGE_GROUPS_QUERY);
