import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseMutation } from "@src/lib/makeUseMutation";
import {
	AllFrontComponentOutput,
	InsertAllFrontComponentInput,
	UpdateAllFrontComponentInput,
} from "@gqlType";

export const UPDATE_ALL_FRONT_COMPONENT_MUTATION = gql`
	mutation UPDATE_ALL_FRONT_COMPONENT($input: UpdateAllFrontComponentInput!) {
		allfrontComponent: updateAllFrontComponent(
			updateAllFrontComponentInput: $input
		) {
			id
		}
	}
` as TypedDocumentNode<
	{
		allfrontComponent: AllFrontComponentOutput;
	},
	{
		input: UpdateAllFrontComponentInput;
	}
>;

export const useUpdateAllFrontComponentMutation = makeUseMutation(
	UPDATE_ALL_FRONT_COMPONENT_MUTATION
);

export const INSERT_ALL_FRONT_COMPONENT_MUTATION = gql`
	mutation INSERT_ALL_FRONT_COMPONENT($input: InsertAllFrontComponentInput!) {
		allFrontComponent: insertAllFrontComponent(
			insertAllFrontComponentInput: $input
		) {
			id
		}
	}
` as TypedDocumentNode<
	{
		allFrontComponent: AllFrontComponentOutput;
	},
	{
		input: InsertAllFrontComponentInput;
	}
>;

export const useInsertAllFrontComponentMutation = makeUseMutation(
	INSERT_ALL_FRONT_COMPONENT_MUTATION
);
