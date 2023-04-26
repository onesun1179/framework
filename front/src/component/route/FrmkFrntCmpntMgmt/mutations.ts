import { gql, TypedDocumentNode } from "@apollo/client";
import {
	FrontComponentEntityOutput,
	InsertFrontComponentEntityInput,
	UpdateFrontComponentEntityInput,
} from "@gqlType";
import { makeUseMutation } from "@src/lib/makeUseMutation";

export const UPDATE_FRONT_COMPONENT = gql`
	mutation UPDATE_FRONT_COMPONENT($input: UpdateFrontComponentEntityInput!) {
		updateFrontComponent(updateFrontComponentInput: $input) {
			id
		}
	}
` as TypedDocumentNode<
	{
		updateFrontComponent: FrontComponentEntityOutput;
	},
	{
		input: UpdateFrontComponentEntityInput;
	}
>;

export const useUpdateFrontComponent = makeUseMutation(UPDATE_FRONT_COMPONENT);

export const INSERT_FRONT_COMPONENT = gql`
	mutation INSERT_FRONT_COMPONENT($input: InsertFrontComponentEntityInput!) {
		insertFrontComponent(insertFrontComponentInput: $input) {
			id
		}
	}
` as TypedDocumentNode<
	{
		insertFrontComponent: FrontComponentEntityOutput;
	},
	{
		input: InsertFrontComponentEntityInput;
	}
>;

export const useInsertFrontComponent = makeUseMutation(INSERT_FRONT_COMPONENT);
