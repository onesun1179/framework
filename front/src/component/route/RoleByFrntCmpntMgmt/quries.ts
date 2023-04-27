import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseQuery } from "@src/lib/makeUseQuery";
import { FrontComponentsOutput } from "@gqlType";

export const ROLE_BY_FRNT_CMPNT_MGMT_QUERY = gql`
	query ROLE_BY_FRNT_CMPNT_MGMT_QUERY($roleSeqNo: Int!) {
		frontComponents {
			list {
				id
				name
				allFrontComponentByRole(roleSeqNo: $roleSeqNo) {
					id
				}
				allFrontComponents {
					id
				}
			}
			total
		}
	}
` as TypedDocumentNode<
	{
		frontComponents: FrontComponentsOutput;
	},
	{
		roleSeqNo: number;
	}
>;

export const useRoleByFrntCmpntMgmtQuery = makeUseQuery(
	ROLE_BY_FRNT_CMPNT_MGMT_QUERY
);
