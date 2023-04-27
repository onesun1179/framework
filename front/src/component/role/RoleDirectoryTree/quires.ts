import { gql, TypedDocumentNode } from "@apollo/client";
import { RoleGroupEntitiesOutput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const ROLE_DIRECTORY_TREE_QUERY = gql`
	query ROLE_DIRECTORY_TREE {
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
	}
` as TypedDocumentNode<{
	roleGroupEntities: RoleGroupEntitiesOutput;
}>;

export const useRoleDirectoryTreeQuery = makeUseQuery(
	ROLE_DIRECTORY_TREE_QUERY
);
