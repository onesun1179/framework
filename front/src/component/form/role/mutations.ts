import { gql, TypedDocumentNode } from "@apollo/client";
import { InsertRoleInput, RoleOutput, UpdateRoleInput } from "@gqlType";
import { makeUseMutation } from "@src/lib/makeUseMutation";

export const INSERT_ROLE_MUTATION = gql`
	mutation INSERT_ROLE($insertRoleInput: InsertRoleInput!) {
		role: insertRole(insertRoleInput: $insertRoleInput) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		role: RoleOutput;
	},
	{
		insertRoleInput: InsertRoleInput;
	}
>;

export const UPDATE_ROLE_MUTATION = gql`
	mutation UPDATE_ROLE($updateRoleInput: UpdateRoleInput!) {
		role: updateRole(updateRoleInput: $updateRoleInput) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		role: RoleOutput;
	},
	{
		updateRoleInput: UpdateRoleInput;
	}
>;

export const useInsertRoleMutation = makeUseMutation(INSERT_ROLE_MUTATION);
export const useUpdateRoleMutation = makeUseMutation(UPDATE_ROLE_MUTATION);
