import { gql, TypedDocumentNode } from "@apollo/client";
import {
	InsertMessageGroupEntityInput,
	MessageGroupEntityOutput,
	UpdateMessageGroupEntityInput,
} from "@gqlType";
import { makeUseMutation } from "@src/lib/makeUseMutation";

export const UPDATE_MESSAGE_GROUP_ENTITY = gql`
	mutation ($input: UpdateMessageGroupEntityInput!) {
		updateMessageGroupEntity(updateMessageGroupEntityInput: $input) {
			code
		}
	}
` as TypedDocumentNode<
	{
		updateMessageGroupEntity: MessageGroupEntityOutput;
	},
	{
		input: UpdateMessageGroupEntityInput;
	}
>;

export const useUpdateMessageGroupEntity = makeUseMutation(
	UPDATE_MESSAGE_GROUP_ENTITY
);

export const INSERT_MESSAGE_GROUP_ENTITY = gql`
	mutation ($input: InsertMessageGroupEntityInput!) {
		insertMessageGroupEntity(insertMessageGroupEntityInput: $input) {
			code
		}
	}
` as TypedDocumentNode<
	{
		insertMessageGroupEntity: MessageGroupEntityOutput;
	},
	{
		input: InsertMessageGroupEntityInput;
	}
>;

export const useInsertMessageGroupEntity = makeUseMutation(
	INSERT_MESSAGE_GROUP_ENTITY
);
