import { gql, TypedDocumentNode } from "@apollo/client";
import { InsertMenuInput, MenuOutput, UpdateMenuInput } from "@gqlType";
import { makeUseMutation } from "@src/lib/makeUseMutation";

export const INSERT_MENU_MUTATION = gql`
	mutation INSERT_MENU($insertMenuInput: InsertMenuInput!) {
		menu: insertMenu(insertMenuInput: $insertMenuInput) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		menu: MenuOutput;
	},
	{
		insertMenuInput: InsertMenuInput;
	}
>;

export const UPDATE_MENU_MUTATION = gql`
	mutation UPDATE_MENU($updateMenuInput: UpdateMenuInput!) {
		menu: updateMenu(updateMenuInput: $updateMenuInput) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		menu: MenuOutput;
	},
	{
		updateMenuInput: UpdateMenuInput;
	}
>;

export const useUpdateMenuMutation = makeUseMutation(UPDATE_MENU_MUTATION);
export const useInsertMenuMutation = makeUseMutation(INSERT_MENU_MUTATION);
