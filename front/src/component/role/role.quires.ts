import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseQuery } from "@src/lib/makeUseQuery";
import { RoleGroupsOutput } from "@gqlType";

export const ROLE_DIRECTORY_TREE_QUERY = gql`
	fragment RoleGroup on RoleGroupOutput {
		seqNo
		name
		roles {
			list {
				seqNo
				name
			}
		}
	}
	query ROLE_DIRECTORY_TREE {
		roleGroups(
			roleGroupsInput: { search: { parentSeqNo: { isNull: { value: true } } } }
		) {
			list {
				...RoleGroup
				children {
					list {
						...RoleGroup
						children {
							list {
								...RoleGroup
								children {
									list {
										...RoleGroup
										children {
											list {
												...RoleGroup
												children {
													list {
														...RoleGroup
													}
												}
											}
										}
									}
								}
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
