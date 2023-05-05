import { gql, TypedDocumentNode } from "@apollo/client";
import { MenusOutput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const MENUS_QUERY = gql`
	fragment Menu on MenuOutput {
		seqNo
		name
		icon {
			seqNo
			name
		}
		route {
			seqNo
			treeInfo {
				fullPath
			}
		}
	}
	query MENUS {
		menus(
			menusInput: {
				search: { role: { parentSeqNo: { isNull: { value: true } } } }
			}
		) {
			list {
				...Menu
				children {
					...Menu
					children {
						...Menu
						children {
							...Menu
							children {
								...Menu
							}
						}
					}
				}
			}
		}
	}
` as TypedDocumentNode<{
	menus: MenusOutput;
}>;

export const useMenusQuery = makeUseQuery(MENUS_QUERY);
