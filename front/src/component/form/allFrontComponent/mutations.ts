import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseMutation } from "@src/lib/makeUseMutation";
import {
	AllFrontComponentOutput,
	ChkUniqByAllFcIdInput,
	InsertAllFrontComponentInput,
	UpdateAllFrontComponentInput,
} from "@gqlType";

export const UPDATE_ALL_FRONT_COMPONENT_MUTATION = gql`
	mutation UPDATE_ALL_FRONT_COMPONENT(
		$updateAllFrontComponentInput: UpdateAllFrontComponentInput!
	) {
		allFrontComponent: updateAllFrontComponent(
			updateAllFrontComponentInput: $updateAllFrontComponentInput
		) {
			id
		}
	}
` as TypedDocumentNode<
	{
		allFrontComponent: AllFrontComponentOutput;
	},
	{
		updateAllFrontComponentInput: UpdateAllFrontComponentInput;
	}
>;

export const INSERT_ALL_FRONT_COMPONENT_MUTATION = gql`
	mutation INSERT_ALL_FRONT_COMPONENT(
		$insertAllFrontComponentInput: InsertAllFrontComponentInput!
	) {
		allFrontComponent: insertAllFrontComponent(
			insertAllFrontComponentInput: $insertAllFrontComponentInput
		) {
			id
		}
	}
` as TypedDocumentNode<
	{
		allFrontComponent: AllFrontComponentOutput;
	},
	{
		insertAllFrontComponentInput: InsertAllFrontComponentInput;
	}
>;

export const CHK_UNIQ_BY_ALL_FC_ID_MUTATION = gql`
	mutation CHK_UNIQ_BY_ALL_FC_ID(
		$chkUniqByAllFcIdInput: ChkUniqByAllFcIdInput!
	) {
		result: chkUniqByAllFcId(input: $chkUniqByAllFcIdInput)
	}
` as TypedDocumentNode<
	{
		result: boolean;
	},
	{
		chkUniqByAllFcIdInput: ChkUniqByAllFcIdInput;
	}
>;

export const useChkUniqByAllFcIdMutation = makeUseMutation(
	CHK_UNIQ_BY_ALL_FC_ID_MUTATION
);

export const useUpdateAllFrontComponentMutation = makeUseMutation(
	UPDATE_ALL_FRONT_COMPONENT_MUTATION
);

export const useInsertAllFrontComponentMutation = makeUseMutation(
	INSERT_ALL_FRONT_COMPONENT_MUTATION
);
