import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseMutation } from "@src/lib/makeUseMutation";
import {
	FrontComponentOutput,
	InsertFrontComponentInput,
	UpdateFrontComponentInput,
} from "@gqlType";

export const UPDATE_FRONT_COMPONENT_MUTATION = gql`
	mutation UPDATE_FRONT_COMPONENT($input: UpdateFrontComponentInput!) {
		frontComponent: updateFrontComponent(updateFrontComponentInput: $input) {
			id
		}
	}
` as TypedDocumentNode<
	{
		frontComponent: FrontComponentOutput;
	},
	{
		input: UpdateFrontComponentInput;
	}
>;

export const useUpdateFrontComponentMutation = makeUseMutation(
	UPDATE_FRONT_COMPONENT_MUTATION
);

export const INSERT_FRONT_COMPONENT_MUTATION = gql`
	mutation INSERT_FRONT_COMPONENT($input: InsertFrontComponentInput!) {
		frontComponent: insertFrontComponent(insertFrontComponentInput: $input) {
			id
		}
	}
` as TypedDocumentNode<
	{
		frontComponent: FrontComponentOutput;
	},
	{
		input: InsertFrontComponentInput;
	}
>;

export const useInsertFrontComponentMutation = makeUseMutation(
	INSERT_FRONT_COMPONENT_MUTATION
);
