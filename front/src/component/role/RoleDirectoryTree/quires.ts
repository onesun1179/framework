import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseQuery } from "@src/lib/makeUseQuery";
import { RoleGroupsOutput } from "@gqlType";

export const ROLE_DIRECTORY_TREE_QUERY = gql`
	query ROLE_DIRECTORY_TREE {
		roleGroups(
			roleGroupsInput: { search: { parentSeqNo: { isNull: { value: true } } } }
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
	roleGroups: RoleGroupsOutput;
}>;

export const useRoleDirectoryTreeQuery = makeUseQuery(
	ROLE_DIRECTORY_TREE_QUERY
);
