import { gql, TypedDocumentNode } from "@apollo/client";
import { PagingInput, RoleGroupsInput, RolesOutput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const ROLE_GROUPS_QUERY = gql`
	query ROLE_GROUPS(
		$pagingInput: PagingInput
		$roleGroupsInput: RoleGroupsInput
	) {
		roleGroups(pagingInput: $pagingInput, roleGroupsInput: $roleGroupsInput) {
			list {
				seqNo
				name
				desc
				updatedAt
				createdAt
			}
		}
	}
` as TypedDocumentNode<
	{
		roleGroups: RolesOutput;
	},
	{
		pagingInput: PagingInput;
		roleGroupsInput: RoleGroupsInput;
	}
>;

export const useRoleGroupsQuery = makeUseQuery(ROLE_GROUPS_QUERY);
