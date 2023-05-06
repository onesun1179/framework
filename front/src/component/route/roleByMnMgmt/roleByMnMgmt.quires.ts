import { gql, TypedDocumentNode } from "@apollo/client";
import { MenuByRoleOutput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const ROLE_BY_MN_MGMT_1_QUERY = gql`
	fragment MenuByRole on MenuByRoleOutput {
		seqNo
		orderNo
		parentSeqNo
		menu {
			name
			iconSeqNo
			route {
				path
				treeInfo {
					fullPath
					depth
				}
			}
		}
	}
	query MenuByRole($roleSeqNo: Int!) {
		menus: menusByRole(roleSeqNo: $roleSeqNo) {
			...MenuByRole
			children {
				...MenuByRole
				children {
					...MenuByRole
					children {
						...MenuByRole
						children {
							...MenuByRole
							children {
								...MenuByRole
							}
						}
					}
				}
			}
		}
	}
` as TypedDocumentNode<
	{
		menus: Array<MenuByRoleOutput>;
	},
	{
		roleSeqNo: number;
	}
>;

export const useRoleByMnMgmt1Query = makeUseQuery(ROLE_BY_MN_MGMT_1_QUERY);
