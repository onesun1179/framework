import { gql, TypedDocumentNode } from "@apollo/client";
import { FrontComponentEntitiesOutput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const ROLE_BY_FRNT_CMPNT_MGMT_QUERY = gql`
	query ROLE_BY_FRNT_CMPNT_MGMT_QUERY($roleSeqNo: Int!) {
		frontComponentEntities {
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
		frontComponentEntities: FrontComponentEntitiesOutput;
	},
	{
		roleSeqNo: number;
	}
>;

export const useRoleByFrntCmpntMgmtQuery = makeUseQuery(
	ROLE_BY_FRNT_CMPNT_MGMT_QUERY
);
