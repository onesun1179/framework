import { gql, TypedDocumentNode } from "@apollo/client";
import { CodeOutput, InsertCodeInput, UpdateCodeInput } from "@gqlType";
import { makeUseMutation } from "@src/lib/makeUseMutation";

export const InsertCodeMutation = gql`
	mutation INSERT_CODE_MUTATION($insertCodeInput: InsertCodeInput!) {
		code: insertCode(insertCodeInput: $insertCodeInput) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		code: CodeOutput;
	},
	{
		insertCodeInput: InsertCodeInput;
	}
>;

export const UpdateCodeMutation = gql`
	mutation UPDATE_CODE_MUTATION($updateCodeInput: UpdateCodeInput!) {
		code: updateCode(updateCodeInput: $updateCodeInput) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		code: CodeOutput;
	},
	{
		updateCodeInput: UpdateCodeInput;
	}
>;

export const useInsertCodeMutation = makeUseMutation(InsertCodeMutation);
export const useUpdateCodeMutation = makeUseMutation(UpdateCodeMutation);
