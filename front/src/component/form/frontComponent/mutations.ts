import { gql, TypedDocumentNode } from "@apollo/client";
import {
	FrontComponentOutput,
	InsertFrontComponentInput,
	UpdateFrontComponentInput,
} from "@gqlType";
import { makeUseMutation } from "@src/lib/makeUseMutation";

export const UpdateFrontComponentMutation = gql`
	mutation UPDATE_FRONT_COMPONENT(
		$updateFrontComponentInput: UpdateFrontComponentInput!
	) {
		frontComponent: updateFrontComponent(
			updateFrontComponentInput: $updateFrontComponentInput
		) {
			id
		}
	}
` as TypedDocumentNode<
	{
		frontComponent: FrontComponentOutput;
	},
	{
		updateFrontComponentInput: UpdateFrontComponentInput;
	}
>;

export const useUpdateFrontComponentMutation = makeUseMutation(
	UpdateFrontComponentMutation
);

export const InsertFrontComponentMutation = gql`
	mutation INSERT_FRONT_COMPONENT(
		$insertFrontComponentInput: InsertFrontComponentInput!
	) {
		frontComponent: insertFrontComponent(
			insertFrontComponentInput: $insertFrontComponentInput
		) {
			id
		}
	}
` as TypedDocumentNode<
	{
		frontComponent: FrontComponentOutput;
	},
	{
		insertFrontComponentInput: InsertFrontComponentInput;
	}
>;

export const useInsertFrontComponentMutation = makeUseMutation(
	InsertFrontComponentMutation
);
