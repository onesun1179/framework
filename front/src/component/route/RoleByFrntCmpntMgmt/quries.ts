import { gql, TypedDocumentNode } from "@apollo/client";
import {
	AllFrontComponentEntitiesOutput,
	FrontComponentEntitiesOutput,
	RoleGroupEntitiesOutput,
} from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const ROLE_BY_FRNT_CMPNT_MGMT_QUERY = gql`
	query ROLE_BY_FRNT_CMPNT_MGMT_QUERY {
		roleGroupEntities(
			roleGroupEntitiesInput: {
				search: { parentSeqNo: { isNull: { value: true } } }
			}
		) {
			list {
				seqNo
				name
				roles {
					seqNo
					name
				}
				children {
					seqNo
					name
					roles {
						seqNo
						name
					}
					children {
						seqNo
						name
						roles {
							seqNo
							name
						}
						children {
							seqNo
							name
							roles {
								seqNo
								name
							}
						}
						children {
							seqNo
							name
							roles {
								seqNo
								name
							}
						}
					}
				}
			}
			total
		}
		frontComponentEntities {
			list {
				id
				name
			}
			total
		}
		allFrontComponentEntities {
			list {
				id
			}
			total
		}
	}
` as TypedDocumentNode<{
	roleGroupEntities: RoleGroupEntitiesOutput;
	frontComponentEntities: FrontComponentEntitiesOutput;
	allFrontComponentEntities: AllFrontComponentEntitiesOutput;
}>;

export const useRoleByFrntCmpntMgmtQuery = makeUseQuery(
	ROLE_BY_FRNT_CMPNT_MGMT_QUERY
);
