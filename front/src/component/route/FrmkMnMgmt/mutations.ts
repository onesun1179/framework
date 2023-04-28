import { gql, TypedDocumentNode } from "@apollo/client";
import { InsertMenuInput, MenuOutput, UpdateMenuInput } from "@gqlType";
import { makeUseMutation } from "@src/lib/makeUseMutation";

export const INSERT_MENU_MUTATION = gql`
	mutation INSERT_MENU($input: InsertMenuInput!) {
		menu: insertMenu(insertMenuInput: $input) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		menu: MenuOutput;
	},
	{
		input: InsertMenuInput;
	}
>;

export const UPDATE_MENU_MUTATION = gql`
	mutation UPDATE_MENU($input: UpdateMenuInput!) {
		menu: updateMenu(updateMenuInput: $input) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		menu: MenuOutput;
	},
	{
		input: UpdateMenuInput;
	}
>;

export const useUpdateMenuMutation = makeUseMutation(UPDATE_MENU_MUTATION);
export const useInsertMenuMutation = makeUseMutation(INSERT_MENU_MUTATION);
