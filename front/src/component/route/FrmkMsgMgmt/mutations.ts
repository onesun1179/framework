import { gql, TypedDocumentNode } from "@apollo/client";
import {
	InsertMessageEntityInput,
	MessageEntityOutput,
	UpdateMessageEntityInput,
} from "@gqlType";
import { makeUseMutation } from "@src/lib/makeUseMutation";

export const UPDATE_MESSAGE_ENTITY = gql`
	mutation UPDATE_MESSAGE_ENTITY($input: UpdateMessageEntityInput!) {
		updateMessageEntity(updateMessageEntityInput: $input) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		updateMessageEntity: MessageEntityOutput;
	},
	{
		input: UpdateMessageEntityInput;
	}
>;

export const useUpdateMessageEntity = makeUseMutation(UPDATE_MESSAGE_ENTITY);

export const INSERT_MESSAGE_ENTITY = gql`
	mutation INSERT_MESSAGE_ENTITY($input: InsertMessageEntityInput!) {
		insertMessageEntity(insertMessageEntityInput: $input) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		insertMessageEntity: MessageEntityOutput;
	},
	{
		input: InsertMessageEntityInput;
	}
>;

export const useInsertMessageEntity = makeUseMutation(INSERT_MESSAGE_ENTITY);
