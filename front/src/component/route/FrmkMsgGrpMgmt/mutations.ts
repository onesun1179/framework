import { gql, TypedDocumentNode } from "@apollo/client";

import { makeUseMutation } from "@src/lib/makeUseMutation";
import {
	InsertMessageGroupInput,
	MessageGroupOutput,
	UpdateMessageGroupInput,
} from "@gqlType";

export const UPDATE_MESSAGE_GROUP_MUTATION = gql`
	mutation ($input: UpdateMessageGroupInput!) {
		messageGroup: updateMessageGroup(updateMessageGroupInput: $input) {
			code
		}
	}
` as TypedDocumentNode<
	{
		messageGroup: MessageGroupOutput;
	},
	{
		input: UpdateMessageGroupInput;
	}
>;

export const useUpdateMessageGroupMutation = makeUseMutation(
	UPDATE_MESSAGE_GROUP_MUTATION
);

export const INSERT_MESSAGE_GROUP_MUTATION = gql`
	mutation ($input: InsertMessageGroupInput!) {
		messageGroup: insertMessageGroup(insertMessageGroupInput: $input) {
			code
		}
	}
` as TypedDocumentNode<
	{
		messageGroup: MessageGroupOutput;
	},
	{
		input: InsertMessageGroupInput;
	}
>;

export const useInsertMessageGroupMutation = makeUseMutation(
	INSERT_MESSAGE_GROUP_MUTATION
);
