import { gql, TypedDocumentNode } from "@apollo/client";

import { makeUseMutation } from "@src/lib/makeUseMutation";
import {
	InsertMessageInput,
	MessageOutput,
	UpdateMessageInput,
} from "@gqlType";

export const UPDATE_MESSAGE_MUTATION = gql`
	mutation UPDATE_MESSAGE($input: UpdateMessageInput!) {
		updateMessage(updateMessageInput: $input) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		updateMessage: MessageOutput;
	},
	{
		input: UpdateMessageInput;
	}
>;

export const useUpdateMessage = makeUseMutation(UPDATE_MESSAGE_MUTATION);

export const INSERT_MESSAGE_MUTATION = gql`
	mutation INSERT_MESSAGE($input: InsertMessageInput!) {
		message: insertMessage(insertMessageInput: $input) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		message: MessageOutput;
	},
	{
		input: InsertMessageInput;
	}
>;

export const useInsertMessage = makeUseMutation(INSERT_MESSAGE_MUTATION);
