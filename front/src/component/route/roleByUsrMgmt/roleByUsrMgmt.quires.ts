import { gql, TypedDocumentNode } from "@apollo/client";
import { UsersOutput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const ROLE_BY_USR_MGMT_1_QUERY = gql`
	query ROLE_BY_USR_MGMT_1 {
		users {
			list {
				id
				name
				email
			}
			total
		}
	}
` as TypedDocumentNode<{
	users: UsersOutput;
}>;

export const useRoleByUsrMgmt1Query = makeUseQuery(ROLE_BY_USR_MGMT_1_QUERY);
