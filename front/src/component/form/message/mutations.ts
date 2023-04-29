import { gql, TypedDocumentNode } from "@apollo/client";

import { makeUseMutation } from "@src/lib/makeUseMutation";
import {
	ChkUniqMessageByCodeInput,
	InsertMessageInput,
	MessageOutput,
	UpdateMessageInput,
} from "@gqlType";

export const UPDATE_MESSAGE_MUTATION = gql`
	mutation UPDATE_MESSAGE($updateMessageInput: UpdateMessageInput!) {
		message: updateMessage(updateMessageInput: $updateMessageInput) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		message: MessageOutput;
	},
	{
		updateMessageInput: UpdateMessageInput;
	}
>;

export const INSERT_MESSAGE_MUTATION = gql`
	mutation INSERT_MESSAGE($insertMessageInput: InsertMessageInput!) {
		message: insertMessage(insertMessageInput: $insertMessageInput) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		message: MessageOutput;
	},
	{
		insertMessageInput: InsertMessageInput;
	}
>;

export const CHK_UNIQ_MESSAGE_BY_CODE_MUTATION = gql`
	mutation CHK_UNIQ_MESSAGE_BY_CODE($input: ChkUniqMessageByCodeInput!) {
		result: chkUniqMessageByCode(input: $input)
	}
` as TypedDocumentNode<
	{
		result: boolean;
	},
	{
		input: ChkUniqMessageByCodeInput;
	}
>;

export const useChkUniqMessageByCodeMutation = makeUseMutation(
	CHK_UNIQ_MESSAGE_BY_CODE_MUTATION
);

export const useUpdateMessageMutation = makeUseMutation(
	UPDATE_MESSAGE_MUTATION
);

export const useInsertMessageMutation = makeUseMutation(
	INSERT_MESSAGE_MUTATION
);
