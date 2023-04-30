import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseQuery } from "@src/lib/makeUseQuery";
import { PagingInput, RolesInput, RolesOutput } from "@gqlType";

export const FRMK_ROLE_MGMT_1_QUERY = gql`
	query FRMK_ROLE_MGMT_1($pagingInput: PagingInput, $rolesInput: RolesInput) {
		roles(pagingInput: $pagingInput, rolesInput: $rolesInput) {
			list {
				seqNo
				name
				identifier
				roleGroupSeqNo
				roleGroup {
					name
				}
				createdAt
				updatedAt
				desc
			}
			total
		}
	}
` as TypedDocumentNode<
	{
		roles: RolesOutput;
	},
	{
		pagingInput: PagingInput;
		rolesInput: RolesInput;
	}
>;

export const useFrmkRoleMgmt1Query = makeUseQuery(FRMK_ROLE_MGMT_1_QUERY);
