import { gql, TypedDocumentNode } from "@apollo/client";
import { MenuByRoleOutput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const MENUS_QUERY = gql`
	fragment MenuByRole on MenuByRoleOutput {
		seqNo
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
	query MenuByRole {
		menus: menusByCurr {
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
` as TypedDocumentNode<{
	menus: Array<MenuByRoleOutput>;
}>;

export const useMenusQuery = makeUseQuery(MENUS_QUERY);
