import { gql, TypedDocumentNode } from "@apollo/client";
import {
	InsertMessageGroupInput,
	MessageGroupOutput,
	UpdateMessageGroupInput,
} from "@gqlType";
import { makeUseMutation } from "@src/lib/makeUseMutation";

export const UpdateMessageGroupMutation = gql`
	mutation UPDATE_MESSAGE_GROUP(
		$updateMessageGroupInput: UpdateMessageGroupInput!
	) {
		messageGroup: updateMessageGroup(
			updateMessageGroupInput: $updateMessageGroupInput
		) {
			code
		}
	}
` as TypedDocumentNode<
	{
		messageGroup: MessageGroupOutput;
	},
	{
		updateMessageGroupInput: UpdateMessageGroupInput;
	}
>;

export const InsertMessageGroupMutation = gql`
	mutation INSERT_MESSAGE_GROUP(
		$insertMessageGroupInput: InsertMessageGroupInput!
	) {
		messageGroup: insertMessageGroup(
			insertMessageGroupInput: $insertMessageGroupInput
		) {
			code
		}
	}
` as TypedDocumentNode<
	{
		messageGroup: MessageGroupOutput;
	},
	{
		insertMessageGroupInput: InsertMessageGroupInput;
	}
>;

export const ENABLE_MESSAGE_GROUP_OF_CODE_MUTATION = gql`
	mutation ENABLE_MESSAGE_GROUP_OF_CODE($code: String!) {
		result: enableMessageGroupOfCode(code: $code)
	}
` as TypedDocumentNode<
	{
		result: boolean;
	},
	{
		code: string;
	}
>;

export const useEnableMessageGroupOfCodeMutation = makeUseMutation(
	ENABLE_MESSAGE_GROUP_OF_CODE_MUTATION
);

export const useUpdateMessageGroupMutation = makeUseMutation(
	UpdateMessageGroupMutation
);

export const useInsertMessageGroupMutation = makeUseMutation(
	InsertMessageGroupMutation
);
