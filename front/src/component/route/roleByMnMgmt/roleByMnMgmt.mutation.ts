import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseMutation } from "@src/lib/makeUseMutation";
import {
	InsertMenuRoleMapInput,
	MenuByRoleOutput,
	RearrangementMenuInput,
	UpdateMenuRoleMapInput,
} from "@gqlType";

export const INSERT_MENU_BY_ROLE_MUTATION = gql`
	mutation INSERT_MENU_BY_ROLE(
		$insertMenuRoleMapInput: InsertMenuRoleMapInput!
	) {
		menuByRoleOutput: insertMenuByRole(
			insertMenuRoleMapInput: $insertMenuRoleMapInput
		) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		menuByRoleOutput: MenuByRoleOutput;
	},
	{
		insertMenuRoleMapInput: InsertMenuRoleMapInput;
	}
>;

export const UPDATE_MENU_BY_ROLE_MUTATION = gql`
	mutation UPDATE_MENU_BY_ROLE(
		$updateMenuRoleMapInput: UpdateMenuRoleMapInput!
	) {
		menuByRoleOutput: updateMenuByRole(
			updateMenuRoleMapInput: $updateMenuRoleMapInput
		) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		menuByRoleOutput: MenuByRoleOutput;
	},
	{
		updateMenuRoleMapInput: UpdateMenuRoleMapInput;
	}
>;

export const REARRANGEMENT_MENU_MUTATION = gql`
	mutation REARRANGEMENT_MENU(
		$rearrangementMenuInput: RearrangementMenuInput!
	) {
		menuByRoleOutput: rearrangementMenu(
			rearrangementMenuInput: $rearrangementMenuInput
		) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		menuByRoleOutput: MenuByRoleOutput;
	},
	{
		rearrangementMenuInput: RearrangementMenuInput;
	}
>;

export const useInsertMenuByRoleMutation = makeUseMutation(
	INSERT_MENU_BY_ROLE_MUTATION
);
export const useUpdateMenuByRoleMutation = makeUseMutation(
	UPDATE_MENU_BY_ROLE_MUTATION
);
export const useRearrangementMenuMutation = makeUseMutation(
	REARRANGEMENT_MENU_MUTATION
);
