import { gql, TypedDocumentNode } from "@apollo/client";
import {
	AllFrontComponentEntityOutput,
	InsertAllFrontComponentEntityInput,
	UpdateAllFrontComponentEntityInput,
} from "@gqlType";
import { makeUseMutation } from "@src/lib/makeUseMutation";

export const UPDATE_ALL_FRONT_COMPONENT = gql`
	mutation UPDATE_ALL_FRONT_COMPONENT(
		$input: UpdateAllFrontComponentEntityInput!
	) {
		updateAllFrontComponent(updateAllFrontComponentInput: $input) {
			id
		}
	}
` as TypedDocumentNode<
	{
		updateAllFrontComponent: AllFrontComponentEntityOutput;
	},
	{
		input: UpdateAllFrontComponentEntityInput;
	}
>;

export const useUpdateAllFrontComponent = makeUseMutation(
	UPDATE_ALL_FRONT_COMPONENT
);

export const INSERT_ALL_FRONT_COMPONENT = gql`
	mutation INSERT_ALL_FRONT_COMPONENT(
		$input: InsertAllFrontComponentEntityInput!
	) {
		insertAllFrontComponent(insertAllFrontComponentInput: $input) {
			id
		}
	}
` as TypedDocumentNode<
	{
		insertAllFrontComponent: AllFrontComponentEntityOutput;
	},
	{
		input: InsertAllFrontComponentEntityInput;
	}
>;

export const useInsertAllFrontComponent = makeUseMutation(
	INSERT_ALL_FRONT_COMPONENT
);
